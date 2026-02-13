
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const contactEmail = "edwardt0303@gmail.com";

  const t = {
    'zh-TW': {
      contact: "聯絡",
      madeWith: "Made with ❤️ in Taiwan."
    },
    'en-US': {
      contact: "Contact",
      madeWith: "Made with ❤️ in Taiwan."
    }
  }[language];
  
  return (
    <footer className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">E</div>
              <span className="text-xl font-black text-gray-900 tracking-tighter">ECHO.</span>
            </div>
            <p className="text-base text-gray-500 font-medium">
              © 2026 ECHO Network. Taipei, Taiwan.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end">
            <h4 className="font-black text-gray-900 mb-4 text-sm uppercase tracking-[0.2em]">{t.contact}</h4>
            <div className="flex flex-col items-start md:items-end gap-2">
              <a href={`mailto:${contactEmail}`} className="text-lg font-black text-purple-600 hover:text-purple-800 transition-colors">
                {contactEmail}
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
          <p className="text-sm text-gray-400 font-medium">{t.madeWith}</p>
          <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">v1.2 Beta</span>
        </div>
      </div>
    </footer>
  );
};
