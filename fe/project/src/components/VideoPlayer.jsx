import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

const VideoPlayer = ({ videoSrc, episodeNumber, onNext, onPrevious, totalEpisodes }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Reset video state when source changes
    setIsPlaying(false);
    setCurrentTime(0);
    setError(null);
    
    // Only attempt autoplay if we have a valid video source
    if (videoSrc && videoRef.current) {
      const timeoutId = setTimeout(async () => {
        try {
          // Set muted to true initially to allow autoplay in most browsers
          videoRef.current.muted = true;
          setIsMuted(true);
          
          await videoRef.current.play();
          setIsPlaying(true);
          
          // After successful autoplay, we can unmute if it wasn't muted before
          if (!isMuted) {
            videoRef.current.muted = false;
            setIsMuted(false);
          }
        } catch (err) {
          console.error("Autoplay failed:", err);
          setError("Unable to autoplay video. Click play to start.");
          setIsPlaying(false);
        }
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [videoSrc, isMuted]);

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        await videoRef.current.pause();
      } else {
        await videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setError(null);
    } catch (err) {
      console.error("Playback failed:", err);
      setError("Unable to play video. Please check the video source.");
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleProgress = (e) => {
    const newTime = (e.target.value / 100) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      <div className="relative aspect-video">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white">
            <p>{error}</p>
          </div>
        )}
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain bg-black"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => {
            console.error("Video error:", e);
            setError("Error loading video. Please check the video source.");
            setIsPlaying(false);
          }}
        />
        
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full">
          Episode {episodeNumber + 1} of {totalEpisodes}
        </div>
      </div>
      
      <div className="p-4 bg-gray-900">
        <div className="flex items-center mb-2">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / (duration || 1)) * 100}
            onChange={handleProgress}
            className="w-full h-2 rounded-full appearance-none bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
          />
        </div>
        
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <button 
              onClick={onPrevious}
              disabled={episodeNumber === 0}
              className="p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-gray-800"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            <button 
              onClick={onNext}
              disabled={episodeNumber === totalEpisodes - 1}
              className="p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipForward className="h-5 w-5" />
            </button>
            
            <span className="text-sm text-gray-300 ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-800"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;