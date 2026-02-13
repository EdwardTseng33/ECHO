
import React from 'react';

export const Philosophy: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-y border-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black tracking-widest uppercase mb-6">
              Core Philosophy
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight">
              從虛擬成就，<br />
              <span className="text-purple-600">回到真實溫度</span>。
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                現代社會我們在遊戲中投入數百小時追求虛擬勳章，但在現實中，鄰里間的點頭微笑卻越來越少。ECHO 試著將這種「即時正向回饋」帶回日常。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                我們相信，數位技術不該只用來讓我們更孤立，而是應該像「回聲」一樣，將你的善意傳遞出去，並帶回有溫度的回應。那一聲真誠的語音感謝，才是這個時代最稀有的成就獎勵。
              </p>
              
              <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-1">信任保護</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">嚴格身分驗證，確保互助過程安全且受尊重。</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-1">社會資產</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">將你的善意紀錄轉化為可信賴的社群履歷。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-8 md:p-12 shadow-inner border border-purple-50/50">
              <div className="text-center space-y-10">
                <div className="inline-block p-6 bg-white rounded-3xl shadow-xl transform -rotate-3 hover:rotate-0 transition-all duration-500 border border-gray-100">
                  <span className="text-4xl block mb-2">🎮</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Virtual World</span>
                  <p className="text-sm font-bold text-gray-400 line-through">虛擬點數與短暫排名</p>
                </div>
                <div className="relative h-12 flex justify-center">
                   <div className="w-px h-full bg-gradient-to-b from-gray-200 to-purple-200"></div>
                   <div className="absolute top-1/2 -translate-y-1/2 bg-white px-2 text-[10px] font-black text-purple-400">TRANSFORM</div>
                </div>
                <div className="inline-block p-8 bg-white rounded-[2.5rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 border-2 border-purple-100 scale-110">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div>)}
                  </div>
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Real-world Echo</span>
                  <p className="text-xl font-black text-gray-900">真實的感謝與關係</p>
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
