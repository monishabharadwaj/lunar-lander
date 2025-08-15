import React from 'react';
import { BrainCircuit, Rocket, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">About This Project</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Reinforcement Learning in Lunar Lander</h3>
            <p className="text-gray-300 mb-4">
              This project demonstrates the application of Deep Q-Network (DQN), a reinforcement learning algorithm, to teach an agent to successfully land a lunar module on the moon's surface. The agent learns to control the module's thrusters to achieve a safe landing.
            </p>
            <p className="text-gray-300 mb-6">
              The videos showcase 20 episodes of the trained agent, demonstrating how reinforcement learning can be applied to solve complex control problems. Each episode represents a different initial condition, showcasing the agent's ability to generalize its learning.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 bg-blue-500 p-2 rounded-lg">
                  <BrainCircuit className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Deep Q-Network (DQN)</h4>
                  <p className="text-gray-400">A reinforcement learning algorithm that combines Q-learning with deep neural networks to approximate optimal action-value functions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 bg-purple-500 p-2 rounded-lg">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">OpenAI Gymnasium</h4>
                  <p className="text-gray-400">Using the Lunar Lander environment from Gymnasium to provide a realistic simulation of lunar landing physics.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 bg-green-500 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Training Progress</h4>
                  <p className="text-gray-400">The agent was trained over multiple episodes, gradually improving its landing strategy through trial and error.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">How It Works</h3>
            <p className="text-gray-300 mb-4">
              The Lunar Lander environment presents a challenging control problem. The agent must learn to:
            </p>
            <ul className="list-disc text-gray-300 ml-5 space-y-2 mb-6">
              <li>Control the main engine and side thrusters</li>
              <li>Balance fuel efficiency and landing precision</li>
              <li>Adjust for different initial positions and velocities</li>
              <li>Land softly on the designated landing pad</li>
            </ul>
            <p className="text-gray-300">
              Using a reward system that penalizes crashes and rewards soft landings, the agent learns through thousands of attempts, gradually improving its strategy. The neural network maps states (position, velocity, angle) to optimal actions (fire main engine, fire left/right thrusters, or do nothing).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;