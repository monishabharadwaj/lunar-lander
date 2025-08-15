import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="w-full h-full bg-[url('https://images.pexels.com/photos/6985003/pexels-photo-6985003.jpeg')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Reinforcement Learning with Lunar Lander
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10">
          Explore 20 episodes of an AI agent learning to land a spacecraft through deep reinforcement learning
        </p>
        <a 
          href="#videos" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
        >
          Watch Episodes
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
};

export default Hero;