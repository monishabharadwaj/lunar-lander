import React from 'react';
import { Rocket } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Rocket className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Lunar Lander RL
          </h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li><a href="#videos" className="hover:text-blue-400 transition-colors">Videos</a></li>
            <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
            <li><a href="#performance" className="hover:text-blue-400 transition-colors">Performance</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;