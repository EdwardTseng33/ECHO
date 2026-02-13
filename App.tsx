
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Philosophy } from './components/Philosophy';
import { Audience } from './components/Audience';
import { VoiceEchoDemo } from './components/VoiceEchoDemo';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scrolled={scrolled} />
      
      <main className="flex-grow">
        <Hero />
        
        <div id="how-it-works">
          <Features />
        </div>

        <Philosophy />
        
        <div id="demo" className="py-20 bg-gradient-to-b from-white to-purple-50">
          <VoiceEchoDemo />
        </div>

        <Partners />

        <div id="vision">
          <Audience />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
