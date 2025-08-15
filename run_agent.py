# run_agent.py

import argparse
import os
import torch
import numpy as np
import gymnasium as gym
import h5py
import agent_class as agent

parser = argparse.ArgumentParser()
parser.add_argument('--f', type=str, default='my_agent',
                    help='input filename (model without extension)')
parser.add_argument('--N', type=int, default=500,
                    help='number of episodes to run')
parser.add_argument('--verbose', action='store_true')
parser.add_argument('--overwrite', action='store_true')
parser.add_argument('--rainbow', action='store_true')
args = parser.parse_args()

filename_base = args.f
model_file = f'{filename_base}.pt'
output_file = f'{filename_base}_trajs.h5'

if os.path.exists(output_file) and not args.overwrite:
    raise RuntimeError(f"File {output_file} already exists. Use --overwrite to overwrite it.")

env = gym.make('LunarLander-v3')
state_dim = env.observation_space.shape[0]
action_dim = env.action_space.n

if args.rainbow:
    my_agent = agent.Agent(state_dim, action_dim)
    my_agent.policy_net.load_state_dict(torch.load(model_file, map_location='cpu'))
else:
    raise NotImplementedError("Only Rainbow DQN is supported in this version.")

durations = []
returns = []

for episode in range(args.N):
    state, _ = env.reset()
    done = False
    total_reward = 0
    steps = 0

    while not done:
        action = my_agent.act(state)
        state, reward, terminated, truncated, _ = env.step(action)
        done = terminated or truncated
        total_reward += reward
        steps += 1

    durations.append(steps)
    returns.append(total_reward)

    if args.verbose:
        print(f"Episode {episode+1}/{args.N} - Return: {total_reward:.2f}, Mean: {np.mean(returns):.2f}")

with h5py.File(output_file, 'w') as f:
    f.create_dataset('returns', data=np.array(returns))
    f.create_dataset('durations', data=np.array(durations))
    f.create_dataset('input_file', data=str.encode(model_file))
    f.create_dataset('N', data=args.N)

print(f"Simulation complete. Data saved to {output_file}")
