# agent_class.py
import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
import random
from collections import namedtuple, deque
import copy

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

Transition = namedtuple('Transition', ('state', 'action', 'next_state', 'reward', 'done'))

class PrioritizedReplayBuffer:
    def __init__(self, capacity, alpha=0.6):
        self.capacity = capacity
        self.alpha = alpha
        self.buffer = []
        self.pos = 0
        self.priorities = np.zeros((capacity,), dtype=np.float32)

    def push(self, transition):
        max_prio = self.priorities.max() if self.buffer else 1.0
        if len(self.buffer) < self.capacity:
            self.buffer.append(transition)
        else:
            self.buffer[self.pos] = transition
        self.priorities[self.pos] = max_prio
        self.pos = (self.pos + 1) % self.capacity

    def sample(self, batch_size, beta=0.4):
        if len(self.buffer) == self.capacity:
            prios = self.priorities
        else:
            prios = self.priorities[:self.pos]

        probs = prios ** self.alpha
        probs /= probs.sum()

        indices = np.random.choice(len(self.buffer), batch_size, p=probs)
        samples = [self.buffer[idx] for idx in indices]

        total = len(self.buffer)
        weights = (total * probs[indices]) ** (-beta)
        weights /= weights.max()
        weights = torch.tensor(weights, dtype=torch.float32, device=device)

        return samples, indices, weights

    def update_priorities(self, indices, priorities):
        for idx, prio in zip(indices, priorities):
            self.priorities[idx] = prio

    def __len__(self):
        return len(self.buffer)

class NoisyLinear(nn.Module):
    def __init__(self, in_features, out_features, std_init=0.5):
        super().__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.std_init = std_init

        self.weight_mu = nn.Parameter(torch.FloatTensor(out_features, in_features))
        self.weight_sigma = nn.Parameter(torch.FloatTensor(out_features, in_features))
        self.register_buffer('weight_epsilon', torch.FloatTensor(out_features, in_features))

        self.bias_mu = nn.Parameter(torch.FloatTensor(out_features))
        self.bias_sigma = nn.Parameter(torch.FloatTensor(out_features))
        self.register_buffer('bias_epsilon', torch.FloatTensor(out_features))

        self.reset_parameters()
        self.reset_noise()

    def reset_parameters(self):
        mu_range = 1 / np.sqrt(self.in_features)
        self.weight_mu.data.uniform_(-mu_range, mu_range)
        self.weight_sigma.data.fill_(self.std_init / np.sqrt(self.in_features))
        self.bias_mu.data.uniform_(-mu_range, mu_range)
        self.bias_sigma.data.fill_(self.std_init / np.sqrt(self.out_features))

    def reset_noise(self):
        self.weight_epsilon.normal_()
        self.bias_epsilon.normal_()

    def forward(self, x):
        if self.training:
            weight = self.weight_mu + self.weight_sigma * self.weight_epsilon
            bias = self.bias_mu + self.bias_sigma * self.bias_epsilon
        else:
            weight = self.weight_mu
            bias = self.bias_mu
        return F.linear(x, weight, bias)

class RainbowDQN(nn.Module):
    def __init__(self, input_dim, output_dim, num_atoms=51, v_min=-10, v_max=10):
        super().__init__()
        self.num_atoms = num_atoms
        self.v_min = v_min
        self.v_max = v_max
        self.support = torch.linspace(self.v_min, self.v_max, self.num_atoms).to(device)

        self.fc1 = NoisyLinear(input_dim, 128)
        self.fc2 = NoisyLinear(128, 128)
        self.fc3 = NoisyLinear(128, output_dim * num_atoms)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        x = x.view(x.size(0), -1, self.num_atoms)
        return F.softmax(x, dim=2)

class Agent:
    def __init__(self, state_dim, action_dim):
        self.state_dim = state_dim
        self.action_dim = action_dim
        self.gamma = 0.99
        self.batch_size = 32
        self.lr = 1e-3
        self.num_atoms = 51
        self.v_min = -10
        self.v_max = 10

        self.policy_net = RainbowDQN(state_dim, action_dim, self.num_atoms, self.v_min, self.v_max).to(device)
        self.target_net = copy.deepcopy(self.policy_net).to(device)
        self.optimizer = torch.optim.Adam(self.policy_net.parameters(), lr=self.lr)
        self.buffer = PrioritizedReplayBuffer(10000)

        self.support = torch.linspace(self.v_min, self.v_max, self.num_atoms).to(device)
        self.delta_z = (self.v_max - self.v_min) / (self.num_atoms - 1)

    def act(self, state):
        state = torch.FloatTensor(state).unsqueeze(0).to(device)
        with torch.no_grad():
            dist = self.policy_net(state).cpu() * self.support
            q_values = dist.sum(2)
            action = q_values.argmax(1).item()
        return action

    def push(self, transition):
        self.buffer.push(transition)

    def train_step(self, beta=0.4):
        if len(self.buffer) < self.batch_size:
            return

        transitions, indices, weights = self.buffer.sample(self.batch_size, beta)
        batch = Transition(*zip(*transitions))

        state_batch = torch.stack(batch.state).float().to(device)
        action_batch = torch.tensor(batch.action).unsqueeze(1).to(device)
        next_state_batch = torch.stack(batch.next_state).float().to(device)
        reward_batch = torch.tensor(batch.reward).to(device)
        done_batch = torch.tensor(batch.done).float().to(device)

        with torch.no_grad():
            next_dist = self.target_net(next_state_batch)
            next_action = (next_dist * self.support).sum(2).argmax(1)
            next_dist = next_dist[range(self.batch_size), next_action]
            t_z = reward_batch.unsqueeze(1) + (1 - done_batch.unsqueeze(1)) * self.gamma * self.support.unsqueeze(0)
            t_z = t_z.clamp(self.v_min, self.v_max)
            b = (t_z - self.v_min) / self.delta_z
            l = b.floor().long()
            u = b.ceil().long()

            m = torch.zeros(self.batch_size, self.num_atoms).to(device)
            for i in range(self.batch_size):
                for j in range(self.num_atoms):
                    m[i][l[i][j]] += next_dist[i][j] * (u[i][j] - b[i][j])
                    m[i][u[i][j]] += next_dist[i][j] * (b[i][j] - l[i][j])

        dist = self.policy_net(state_batch)
        log_p = torch.log(dist[range(self.batch_size), action_batch.squeeze(1)])
        loss = -(m * log_p).sum(1)
        self.optimizer.zero_grad()
        (loss * weights).mean().backward()
        self.optimizer.step()
        self.buffer.update_priorities(indices, loss.detach().cpu().numpy() + 1e-5)

    def update_target(self):
        self.target_net.load_state_dict(self.policy_net.state_dict())
