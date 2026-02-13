
import React from 'react';

interface NavbarProps {
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 px-6 py-4 ${
      scrolled ? 'glass-card border-b border-white/20' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">E</div>
          <span className="text-xl font-black tracking-tighter text-gray-900">ECHO.</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <button onClick={() => scrollTo('how-it-works')} className="hover:text-purple-600 transition">運作模式</button>
          <button onClick={() => scrollTo('demo')} className="hover:text-purple-600 transition">聽見回聲</button>
          <button onClick={() => scrollTo('partners')} className="hover:text-purple-600 transition">成為夥伴</button>
          <button onClick={() => scrollTo('vision')} className="hover:text-purple-600 transition">願景</button>
        </div>
        
        <button 
          onClick={() => scrollTo('join')}
          className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition transform hover:scale-105"
        >
          搶先加入
        </button>
      </div>
    </nav>
  );
};
