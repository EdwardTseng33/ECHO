
import React, { useState } from 'react';

export const Partners: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setStatus('submitting');

    try {
      const response = await fetch("https://formspree.io/f/mqaeapzo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _subject: "ECHO 合作夥伴提案" }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="partners" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Expanded Explanation */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                與 <span className="text-purple-600">ECHO</span> 合作
              </h2>
              <p className="text-gray-500 text-xl leading-relaxed font-medium">
                我們正在尋找 HR 專家、NGO 領袖與社區管理者，透過「回聲機制」重新定義組織與社區的連結。
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-2xl">🤝</div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">深度試點計畫</h4>
                  <p className="text-gray-600 leading-relaxed">針對特定企業或社區設計專屬的回聲任務與激勵體系，驗證互助對心理安全感與關係品質的提升。</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center flex-shrink-0 text-2xl">📊</div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">信任資產數據化</h4>
                  <p className="text-gray-600 leading-relaxed">提供去識別化的社群共鳴分析報告，幫助管理者了解組織內部的非正式支援流向，量化社會資本。</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-2xl">🌱</div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">公益與社會影響</h4>
                  <p className="text-gray-600 leading-relaxed">結合 NGO 資源，讓「回聲」成為長者遠距陪伴、弱勢支援的新形態工具，創造持久的社會價值。</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 italic text-gray-500 text-sm">
              「我們不只是在開發 App，我們在建立一種能夠對抗疏離感的基礎設施。」
            </div>
          </div>

          {/* Right Side: Compact Contact Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-[3rem] blur-2xl opacity-30 -z-10"></div>
            
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 max-w-lg mx-auto lg:ml-auto lg:mr-0 min-h-[500px] flex flex-col">
              {status !== 'success' ? (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-8 bg-purple-600 rounded-full"></div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">合作提案</h3>
                  </div>

                  <form className="space-y-6 flex-grow" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">姓名 / 單位</label>
                      <input 
                        type="text" 
                        name="name_or_org"
                        required
                        className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-300 outline-none transition-all text-base font-medium text-gray-900 placeholder-gray-400" 
                        placeholder="姓名或單位名稱" 
                        disabled={status === 'submitting'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-300 outline-none transition-all text-base font-medium text-gray-900 placeholder-gray-400" 
                        placeholder="contact@email.com" 
                        disabled={status === 'submitting'}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">合作領域</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['職場福祉', '親子家庭', '高齡社區', '其他'].map((option) => (
                          <label key={option} className="relative group flex items-center justify-center py-2 rounded-lg border border-gray-100 bg-gray-50 cursor-pointer hover:bg-white hover:border-purple-200 transition-all text-sm font-bold text-gray-500">
                            <input type="radio" name="field" value={option} required className="sr-only peer" />
                            <span className="peer-checked:text-purple-700 transition-colors">{option}</span>
                            <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-purple-500 pointer-events-none transition-all"></div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">說明</label>
                      <textarea 
                        name="message"
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-300 outline-none transition-all h-28 text-base font-medium text-gray-900 placeholder-gray-400 resize-none" 
                        placeholder="請簡述您的想法..."
                        disabled={status === 'submitting'}
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group w-full bg-gray-900 text-white py-4 rounded-xl font-black text-lg hover:bg-purple-700 transition-all shadow-lg flex items-center justify-center gap-3 transform active:scale-[0.98]"
                    >
                      {status === 'submitting' ? (
                        <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          提交
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                    
                    {status === 'error' && (
                      <p className="text-red-500 text-xs font-bold text-center">傳送失敗，請檢查資料或稍後再試。</p>
                    )}

                    <div className="flex items-center justify-center gap-2 py-3 bg-purple-50/50 rounded-xl border border-purple-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                      <p className="text-xs font-black text-purple-700">我們將盡快由專人回覆</p>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl shadow-sm">✅</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">提案已收到</h3>
                    <p className="text-gray-500 font-medium">感謝您的主動聯絡，我們的團隊會盡快與您聯繫探討合作可能。</p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-purple-600 font-black text-sm hover:underline"
                  >
                    再發送一則提案
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
