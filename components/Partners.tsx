
import React, { useState } from 'react';

// --- 已填入您的 Google Apps Script 網址 ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzE_gGxX6UB_58y_6Zboa-AO_xjs9nZXcxsGrlj3x4b94QbZucsbe2LoopOVVcuwAF2eQ/exec";

export const Partners: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setStatus('submitting');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...data, 
          type: "合作提案",
          source: "Partner Form",
          submitted_at: new Date().toLocaleString()
        }),
      });
      setStatus('success');
    } catch (error) {
      console.error("Partner submission error:", error);
      setStatus('error');
      setErrorMessage('傳送異常，請檢查網路連線');
    }
  };

  return (
    <section id="partners" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
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
                  <p className="text-gray-600 leading-relaxed">針對特定企業或社區設計專屬的回聲任務與激勵體系。</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center flex-shrink-0 text-2xl">📊</div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">信任資產數據化</h4>
                  <p className="text-gray-600 leading-relaxed">提供去識別化的社群共鳴分析報告，量化社會資本。</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 italic text-gray-500 text-sm">
              「所有合作需求將直接匯入 Google Sheets，我們會於一週內回覆。」
            </div>
          </div>

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
                      <input type="text" name="name_or_org" required className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-base font-medium" placeholder="姓名或單位名稱" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                      <input type="email" name="email" required className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-base font-medium" placeholder="contact@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">說明</label>
                      <textarea name="message" required className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all h-28 text-base font-medium resize-none" placeholder="請簡述您的想法..."></textarea>
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="group w-full bg-gray-900 text-white py-4 rounded-xl font-black text-lg hover:bg-purple-700 transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98]">
                      {status === 'submitting' ? <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : '提交提案'}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-xs font-bold text-center mt-2">{errorMessage || '傳送失敗，請稍後再試。'}</p>}
                  </form>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl shadow-sm">✅</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">提案已同步</h3>
                    <p className="text-gray-500 font-medium">感謝您的主動聯絡。提案資料已直接存入我們的 Google Sheets 試點清單，我們將儘速與您聯繫。</p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="text-purple-600 font-black text-sm hover:underline transition-all">發送新提案</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
