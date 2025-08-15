import React from 'react';
import { Rocket, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Rocket className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">Lunar Lander RL</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between">
          <p>© 2025 Lunar Lander Reinforcement Learning Project</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex gap-6">
              <li><a href="#videos" className="hover:text-white transition-colors">Videos</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#performance" className="hover:text-white transition-colors">Performance</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;