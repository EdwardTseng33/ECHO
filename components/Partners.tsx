
import React, { useState } from 'react';

const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE";

export const Partners: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setStatus('submitting');
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          ...data, 
          source: "Partner Proposal Form",
        }),
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="partners" className="py-20 md:py-32 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="space-y-12">
            <div className="reveal-text">
              <div className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 text-[10px] font-black rounded-full mb-6 tracking-widest uppercase">Global Network</div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
                與 <span className="text-gradient">ECHO</span> 合作
              </h2>
              <p className="text-gray-500 text-xl leading-relaxed font-bold">
                我們致力於連結 HR 專家、NGO、社區領袖，以及深具永續意識的品牌商，共同打造全台灣最有溫度的互助網路。
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-purple-50 flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-110 transition-transform">🎁</div>
                <div>
                  <h4 className="text-2xl font-black text-gray-900 mb-2">品牌紅利計畫 (兌換)</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    與連鎖通路與生活品牌商合作，讓社群回聲點數可直接兌換實體優惠、贈品或消費折扣，讓善意具備實質的回饋價值。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-pink-50 flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-110 transition-transform">🏢</div>
                <div>
                  <h4 className="text-2xl font-black text-gray-900 mb-2">企業內部試點</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">為企業打造專屬的團隊互助機制，提升職場心理安全感與跨部門協作效率。</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-110 transition-transform">🏘️</div>
                <div>
                  <h4 className="text-2xl font-black text-gray-900 mb-2">鄰里互助治理</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">協助社區管委會或地方 NGO 建立去中心化的互助存摺，量化社區社會資本。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="absolute -inset-6 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-[4rem] blur-3xl -z-10"></div>
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-gray-50 max-w-lg mx-auto lg:ml-auto w-full">
              {status !== 'success' ? (
                <>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-1.5 h-10 bg-gray-900 rounded-full"></div>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">合作提案</h3>
                  </div>
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">姓名 / 單位名稱</label>
                      <input 
                        type="text" 
                        name="name_or_org" 
                        required 
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all text-gray-900 font-black text-lg placeholder-gray-300" 
                        placeholder="例如：王小明 / 回聲行銷公司" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">聯絡 Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all text-gray-900 font-black text-lg placeholder-gray-300" 
                        placeholder="contact@brand.com" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">合作想法簡述</label>
                      <textarea 
                        name="message" 
                        required 
                        rows={4}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all h-36 text-gray-900 font-black text-lg resize-none placeholder-gray-300" 
                        placeholder="期待與您交流品牌點數兌換或試點計畫..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === 'submitting'} 
                      className="group w-full bg-gray-900 text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-purple-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4"
                    >
                      {status === 'submitting' ? (
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : '提交合作提案'}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-xs font-black text-center">連線錯誤，請稍後再試。</p>}
                  </form>
                </>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl">🤝</div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-gray-900">提案已提交</h3>
                    <p className="text-gray-500 font-bold leading-relaxed">
                      感謝您的主動聯絡！我們將在 48 小時內查閱提案並與您連繫。
                    </p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="text-purple-600 font-black text-sm hover:underline uppercase tracking-widest">發送新的提案</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
