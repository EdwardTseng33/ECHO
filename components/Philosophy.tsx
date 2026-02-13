
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Philosophy: React.FC = () => {
  const { language } = useLanguage();

  const t = {
    'zh-TW': {
      label: "Our Philosophy",
      title: <>我們在虛擬世界花大錢<br /><span className="text-purple-600">只為了讓別人看見</span>。</>,
      p1: "你為了遊戲裡的「傳說造型」課金，為了社群上的「按讚數」修圖。我們渴望被關注、被肯定，但往往只換來短暫的空虛。",
      p2: "如果我們把這份渴望，轉移到現實生活呢？在 ECHO，你的每一次付出，都是一次「真實的升級」。你獲得的不是虛擬寶物，而是鄰居真心的感激、同事眼裡的敬佩。",
      impact: { title: "真實影響力", desc: "比全服第一更榮耀的，是你真的幫到了某個人。" },
      warmth: { title: "被看見的溫暖", desc: "讓每一份善意都有回音，不再是默默付出。" },
      visuals: {
        loot: "虛擬寶物",
        gratitude: "來自真人的感謝"
      }
    },
    'en-US': {
      label: "Our Philosophy",
      title: <>We spend a fortune on virtual status<br /><span className="text-purple-600">just to be seen</span>.</>,
      p1: "We buy skins for 'Legendary Looks', we edit photos for 'Likes'. We crave connection and validation, but often find only fleeting satisfaction.",
      p2: "What if we shifted this energy to reality? In ECHO, every contribution is a 'Real World Upgrade'. You don't gain virtual items; you gain genuine gratitude from neighbors and respect from colleagues.",
      impact: { title: "Real Impact", desc: "Better than a high score: knowing you actually helped someone." },
      warmth: { title: "The Warmth of Recognition", desc: "Every act of kindness echoes back. No more silent toil." },
      visuals: {
        loot: "Virtual Loot",
        gratitude: "Real Gratitude"
      }
    }
  }[language];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-y border-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black tracking-widest uppercase mb-6">
              {t.label}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
              {t.title}
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                {t.p1}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                {t.p2}
              </p>
              
              <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-2xl transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-1">{t.impact.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{t.impact.desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-2xl transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-1">{t.warmth.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{t.warmth.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-8 md:p-12 shadow-inner border border-purple-50/50">
              <div className="text-center space-y-10">
                <div className="inline-block p-6 bg-white rounded-3xl shadow-xl transform -rotate-3 hover:rotate-0 transition-all duration-500 border border-gray-100 opacity-60 grayscale hover:grayscale-0">
                  <span className="text-4xl block mb-2">💎</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Virtual Loot</span>
                  <p className="text-sm font-bold text-gray-400 line-through">{t.visuals.loot}</p>
                </div>
                <div className="relative h-12 flex justify-center">
                   <div className="w-px h-full bg-gradient-to-b from-gray-200 to-purple-200"></div>
                   <div className="absolute top-1/2 -translate-y-1/2 bg-white px-2 text-[10px] font-black text-purple-400 tracking-widest">REALITY SHIFT</div>
                </div>
                <div className="inline-block p-8 bg-white rounded-[2.5rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 border-2 border-purple-100 scale-110">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div>)}
                  </div>
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Real Gratitude</span>
                  <p className="text-xl font-black text-gray-900">{t.visuals.gratitude}</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};
