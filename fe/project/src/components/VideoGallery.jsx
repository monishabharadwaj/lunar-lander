import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

const VideoGallery = () => {
  const [currentEpisode, setCurrentEpisode] = useState(0);
  
  // Total number of episodes
  const totalEpisodes = 20;
  //qwerty
  // Function to get video URL for a specific episode
  const getVideoUrl = (episodeNumber) => {
    return `/videos/rl-video-episode-${episodeNumber}.mp4`;
  };

  const handleNext = () => {
    if (currentEpisode < totalEpisodes - 1) {
      setCurrentEpisode(currentEpisode + 1);
    }
  };

  const handlePrevious = () => {
    if (currentEpisode > 0) {
      setCurrentEpisode(currentEpisode - 1);
    }
  };

  const handleEpisodeClick = (index) => {
    setCurrentEpisode(index);
  };

  // Generate thumbnail preview items
  const thumbnailItems = Array.from({ length: totalEpisodes }, (_, index) => (
    <div 
      key={index}
      onClick={() => handleEpisodeClick(index)}
      className={`relative cursor-pointer rounded-md overflow-hidden transition-all ${
        currentEpisode === index ? 'border-2 border-blue-500 scale-105' : 'border border-gray-700 hover:border-gray-500'
      }`}
    >
      <div className="aspect-video bg-gray-800 flex items-center justify-center">
        <span className="text-white font-medium text-sm">Episode {index + 1}</span>
      </div>
    </div>
  ));

  return (
    <section id="videos" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Lunar Lander Episodes</h2>
        
        <div className="max-w-4xl mx-auto mb-12">
          <VideoPlayer 
            videoSrc={getVideoUrl(currentEpisode)}
            episodeNumber={currentEpisode}
            onNext={handleNext}
            onPrevious={handlePrevious}
            totalEpisodes={totalEpisodes}
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl text-white mb-4">All Episodes</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
            {thumbnailItems}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 mt-8">
          <h3 className="text-xl text-white mb-3">About This Episode</h3>
          <p className="text-gray-300">
            Episode {currentEpisode + 1} shows the trained reinforcement learning agent attempting to land the lunar module safely on the surface. Each episode demonstrates the agent's policy after training, showing how it handles different initial conditions and applies the learned control strategy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;