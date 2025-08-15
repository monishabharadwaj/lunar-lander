# train_agent.py

import argparse
import os
import time
import gymnasium as gym
import torch
import agent_class as agent
import numpy as np

parser = argparse.ArgumentParser()
parser.add_argument('--f', type=str, default='my_agent',
                    help='output filename (suffix will be added by script)')
parser.add_argument('--verbose', action='store_true')
parser.add_argument('--overwrite', action='store_true')
parser.add_argument('--rainbow', action='store_true')
args = parser.parse_args()

filename_base = args.f
output_model = f'{filename_base}.pt'
output_stats = f'{filename_base}_training_stats.txt'
overwrite = args.overwrite
verbose = args.verbose
rainbow = args.rainbow

if not overwrite and os.path.exists(output_model):
    raise RuntimeError(f"File {output_model} already exists. Use --overwrite to overwrite it.")

env = gym.make('LunarLander-v3')
state_dim = env.observation_space.shape[0]
action_dim = env.action_space.n

if rainbow:
    my_agent = agent.Agent(state_dim, action_dim)
else:
    raise NotImplementedError("Only Rainbow DQN is supported in this version.")

episode_rewards = []
update_freq = 5

start_time = time.time()

for episode in range(1000):
    state, _ = env.reset()
    total_reward = 0
    done = False

    while not done:
        action = my_agent.act(state)
        next_state, reward, terminated, truncated, _ = env.step(action)
        done = terminated or truncated
        my_agent.push((torch.tensor(state, dtype=torch.float32),
                       action,
                       torch.tensor(next_state, dtype=torch.float32),
                       reward,
                       done))
        state = next_state
        total_reward += reward
        my_agent.train_step()

    if episode % update_freq == 0:
        my_agent.update_target()

    episode_rewards.append(total_reward)
    if verbose:
        print(f"Episode {episode}: Return = {total_reward:.2f}")

    if np.mean(episode_rewards[-20:]) > 200:
        print(f"Solved in {episode+1} episodes.")
        break

torch.save(my_agent.policy_net.state_dict(), output_model)

with open(output_stats, 'w') as f:
    for i, r in enumerate(episode_rewards):
        f.write(f"{i},{r}\n")

print(f"Training complete in {time.time() - start_time:.2f} seconds")
