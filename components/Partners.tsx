import React, { useState } from 'react';

// 請在此替換您的 Google Apps Script 部署網址
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE";

export const Partners: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setStatus('submitting');
    try {
      // 在 no-cors 模式下，不設定 headers 以避免 CORS 預檢失敗
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          targetSheet: "Partners", 
          ...data, 
          timestamp: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
        }),
      });
      setStatus('success');
    } catch (error) {
      console.error("Partner submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="partners" className="py-16 md:py-32 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="space-y-12">
            <div className="reveal-text">
              <div className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 text-[10px] font-black rounded-full mb-6 tracking-widest uppercase">Global Partnership</div>
              <h2 className="text-3xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">
                與 <span className="text-gradient">ECHO</span> 合作
              </h2>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-bold">
                我們致力於連結深具永續意識的 brand 商，將日常善意轉化為具備實質獎勵價值的社群紅利。
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-purple-50 flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-110 transition-transform">🎁</div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-2">品牌點數兌換合作</h4>
                  <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
                    品牌商可提供**實體商品兌換**、折扣券或專屬體驗，讓使用者憑藉「回聲任務」點數直接換取品牌商品，在推動社會善意的同時，為品牌帶來精準客流與 ESG 價值。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-pink-50 flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-110 transition-transform">🏢</div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-2">企業內部試點</h4>
                  <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
                    為企業打造專屬的團隊互助機制，提升職場心理安全感，將同儕間的非正式支援轉化為可見的組織資產。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-110 transition-transform">🏘️</div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-2">鄰里互助治理</h4>
                  <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
                    協助地方 NGO 與社區單位建立去中心化的互助存摺，量化並激勵鄰里間的勞動與關懷交換。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="absolute -inset-6 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-[4rem] blur-3xl -z-10"></div>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-gray-50 max-w-lg mx-auto lg:ml-auto w-full">
              {status !== 'success' ? (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-8 bg-gray-900 rounded-full"></div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">合作提案</h3>
                  </div>
                  <form className="space-y-6 flex-grow" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">姓名 / 單位名稱</label>
                      <input 
                        type="text" 
                        name="name_or_org" 
                        required 
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all text-gray-900 font-black text-lg placeholder-gray-300" 
                        placeholder="例如：林大為 / ECHO 品牌部" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">聯絡 Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all text-gray-900 font-black text-lg placeholder-gray-300" 
                        placeholder="contact@brand-partner.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">合作想法簡述</label>
                      <textarea 
                        name="message" 
                        required 
                        rows={4}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all h-32 text-gray-900 font-black text-lg resize-none placeholder-gray-300" 
                        placeholder="期待洽談點數兌換商品、企業內部應用或其他合作方式..."
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
                    {status === 'error' && <p className="text-red-500 text-xs font-black text-center">連線錯誤，請確認網路或連結設定。</p>}
                  </form>
                </>
              ) : (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-5xl">🤝</div>
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900">提案已提交</h3>
                    <p className="text-gray-500 font-bold px-4 text-sm md:text-base">
                      感謝您的主動聯繫！我們將在查閱提案後與您連繫。
                    </p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="text-purple-600 font-black text-xs hover:underline uppercase tracking-widest">發送新的提案</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
