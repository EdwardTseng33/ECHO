
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const { language, setLanguage } = useLanguage();

  const t = {
    'zh-TW': {
      howItWorks: '運作模式',
      demo: '聽見回聲',
      partners: '成為夥伴',
      vision: '願景',
      join: '搶先加入',
    },
    'en-US': {
      howItWorks: 'How it Works',
      demo: 'Experience',
      partners: 'Partners',
      vision: 'Vision',
      join: 'Join Beta',
    }
  }[language];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh-TW' ? 'en-US' : 'zh-TW');
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
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-purple-600 transition">{t.howItWorks}</button>
            <button onClick={() => scrollTo('demo')} className="hover:text-purple-600 transition">{t.demo}</button>
            <button onClick={() => scrollTo('partners')} className="hover:text-purple-600 transition">{t.partners}</button>
            <button onClick={() => scrollTo('vision')} className="hover:text-purple-600 transition">{t.vision}</button>
          </div>
          
          {/* Enhanced Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="group flex items-center gap-2 bg-white/60 hover:bg-white border border-gray-200 hover:border-purple-200 rounded-full p-1 pl-2 transition-all duration-300 hover:shadow-md cursor-pointer"
            aria-label="Switch Language"
          >
            {/* Globe Icon */}
            <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            {/* Segmented Toggle */}
            <div className="flex items-center bg-gray-100/80 rounded-full p-0.5">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-all duration-300 min-w-[32px] text-center ${
                language === 'zh-TW' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}>
                中
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-all duration-300 min-w-[32px] text-center ${
                language === 'en-US' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}>
                EN
              </span>
            </div>
          </button>

          <button 
            onClick={() => scrollTo('join')}
            className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition transform hover:scale-105 hidden sm:block"
          >
            {t.join}
          </button>
        </div>
      </div>
    </nav>
  );
};
