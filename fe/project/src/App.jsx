import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoGallery from './components/VideoGallery';
import About from './components/About';
import Performance from './components/Performance';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Hero />
      <VideoGallery />
      <About />
      <Performance />
      <Footer />
    </div>
  );
}

export default App;