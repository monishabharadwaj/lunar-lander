import React from 'react';

const Performance = () => {
  return (
    <section id="performance" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Training Performance</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl text-white mb-4">Training Progress</h3>
            <div className="bg-gray-900 p-4 rounded-lg mb-4">
              <img 
                src="/traindata.png" 
                alt="Training progress graph showing episode rewards over time"
                className="w-full h-auto rounded"
              />
              <p className="text-gray-400 mt-3 text-sm">The graph shows the agent's reward improving over training episodes, with the running average (black line) trending upward.</p>
            </div>
            <p className="text-gray-300">
              The training curve demonstrates how the agent improved over time. Initially, the agent performed poorly, often crashing the lander. As training progressed, it learned more effective control strategies, eventually achieving consistently high rewards.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl text-white mb-4">Key Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-medium mb-1">Average Return</h4>
                  <p className="text-2xl text-white font-bold">233.21</p>
                  <p className="text-gray-400 text-sm">Across final 20 episodes</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-green-400 font-medium mb-1">Success Rate</h4>
                  <p className="text-2xl text-white font-bold">85%</p>
                  <p className="text-gray-400 text-sm">Safe landings in test runs</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-medium mb-1">Training Episodes</h4>
                  <p className="text-2xl text-white font-bold">988</p>
                  <p className="text-gray-400 text-sm">Total learning episodes</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-medium mb-1">Avg Episode Length</h4>
                  <p className="text-2xl text-white font-bold">452</p>
                  <p className="text-gray-400 text-sm">Time steps per episode</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl text-white mb-4">Algorithm Details</h3>
              <ul className="space-y-3 text-gray-300">
                <li><span className="text-blue-400 font-medium">Algorithm:</span> Deep Q-Network (DQN)</li>
                <li><span className="text-blue-400 font-medium">Network Architecture:</span> Multi-layer perceptron</li>
                <li><span className="text-blue-400 font-medium">Input State Size:</span> 8 dimensions</li>
                <li><span className="text-blue-400 font-medium">Action Space:</span> 4 discrete actions</li>
                <li><span className="text-blue-400 font-medium">Experience Replay:</span> Used for stable learning</li>
                <li><span className="text-blue-400 font-medium">Exploration Strategy:</span> Epsilon-greedy policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;