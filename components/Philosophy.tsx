
import React from 'react';

export const Philosophy: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight">
              從虛擬成就，<br />
              <span className="text-purple-600">回到真實溫度</span>。
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                年輕世代在遊戲中尋找成就感，花費心力與金錢追求虛擬的肯定。但在 ECHO，我們試著將這種「反饋機制」帶回現實。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                我們相信，數位化與 AI 不該取代人際溫度，而是應該成為連結彼此的橋樑。當你幫助鄰居或同事，聽見那一聲真誠的「謝謝」，那種成就感是任何虛擬寶物都無法比擬的。
              </p>
              
              <div className="pt-8 border-t border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-1">信任保護機制</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      重拾人際信任需要基礎。ECHO 設有嚴格的身分審核系統與行為守則，並透過去中心化的評價機制，確保每一次的互動都在安全、尊重的基礎下進行。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-12 shadow-inner">
              <div className="text-center space-y-8">
                <div className="inline-block p-6 bg-white rounded-3xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <span className="text-4xl block mb-2">🎮</span>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Virtual Achievement</span>
                  <p className="text-sm font-bold text-gray-400 line-through">虛擬點數與排位</p>
                </div>
                <div className="w-px h-12 bg-gray-200 mx-auto"></div>
                <div className="inline-block p-8 bg-white rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border-2 border-purple-100">
                  <span className="text-5xl block mb-2">💬</span>
                  <span className="text-xs font-black text-purple-600 uppercase tracking-widest">Real-world Echo</span>
                  <p className="text-lg font-black text-gray-900">真實的感謝與信任</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
