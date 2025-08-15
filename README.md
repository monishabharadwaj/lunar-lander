# ​ Lunar Lander – Rainbow DQN Reinforcement Learning

A reinforcement learning project to train an AI agent that lands a lunar module using **Rainbow DQN**, a powerful enhancement of the classic DQN algorithm.

---

##  Live Demo

[https://lunar-lander-dqn.netlify.app/](https://lunar-lander-dqn.netlify.app/)  
**Try it live:** Watch the agent perform landing maneuvers in real time through the interactive web interface.

---

##  Overview

This project solves the **LunarLander-v2** environment from OpenAI Gym, where the task is to control a spacecraft’s thrusters to land safely between two markers. We use **Rainbow DQN**, which integrates several modern improvements for more efficient training and environment interaction.

---

##  Key Features

- Full Rainbow DQN implementation with:
  - Double DQN  
  - Dueling Networks  
  - Prioritized Experience Replay  
  - Multi-step Learning  
  - Distributional RL  
  - Noisy Networks  
- Training and testing scripts with performance visualizations
- Live web demo showcasing agent behavior online

---

##  How It Works

1. **Environment Module** – Sets up the Lunar Lander environment using OpenAI Gym.  
2. **Agent Module** – Encodes the Rainbow DQN agent with multiple advanced RL components.  
3. **Training Module** – Collects experience, optimizes the network, and logs rewards.  
4. **Evaluation & Demo** – Runs evaluation episodes and powers a web demo to visualize agent behavior in real time.

---

##  Tech Stack

- **Language:** Python  
- **Libraries:** PyTorch, NumPy, Matplotlib, Gym  
- **Front-End:** Deployed to Netlify at the Live Demo URL  
- **Env:** Compatible with Google Colab / local GPU setups

---

##  Results

- Achieved stable average reward **above 200**, indicating successful landings.  
- Learning plots show steady convergence with minimal oscillation.  
- Live demo delivers real-time visualization of agent behavior for public viewing.

---

## 📂 Repository Structure

```plaintext
lunar-lander/
│
├── main.py               # Train/test launcher
├── agent.py              # Rainbow DQN implementation
├── memory.py             # Prioritized Replay Buffer
├── utils.py              # Utilities and helpers
├── results/              # Training plots and checkpoints
├── fe/                   # Front-end for demo
│   └── project/
└── README.md             # This documentation

