
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// 【已更新】Google Apps Script 網址
const PARTNER_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzE_gGxX6UB_58y_6Zboa-AO_xjs9nZXcxsGrlj3x4b94QbZucsbe2LoopOVVcuwAF2eQ/exec";

export const Partners: React.FC = () => {
  const { language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const t = {
    'zh-TW': {
      title: <>與 <span className="text-purple-600">ECHO</span> 合作</>,
      desc: "我們正在尋找 HR 專家、NGO 領袖與品牌夥伴，透過「回聲機制」重新定義組織、社區與商業的連結。",
      points: [
        { title: "深度試點計畫", desc: "針對特定企業或社區設計專屬的回聲任務與激勵體系。" },
        { title: "信任資產數據化", desc: "提供去識別化的社群共鳴分析報告，量化社會資本。" },
        { title: "品牌廠商", desc: "提供商品作為回聲點數兌換，將行銷預算轉化為實質的社會公益支持與品牌認同。" }
      ],
      form: {
        title: "合作提案",
        name: "姓名 / 單位",
        namePlace: "姓名或單位名稱",
        email: "Email",
        message: "說明",
        messagePlace: "請簡述您的合作想法...",
        submit: "提交提案",
        submitting: "提交中...",
        error: "傳送失敗，請稍後再試。",
        successTitle: "提案已提交",
        successDesc: "感謝您的主動聯絡，我們會盡快查閱並與您連繫。",
        new: "發送新提案"
      }
    },
    'en-US': {
      title: <>Partner with <span className="text-purple-600">ECHO</span></>,
      desc: "We are looking for HR experts, NGO leaders, and brand partners to redefine organizational and community connections through the 'Echo Mechanism'.",
      points: [
        { title: "Pilot Programs", desc: "Design exclusive Echo quests and incentive systems for enterprises or communities." },
        { title: "Social Capital Data", desc: "De-identified community resonance analysis reports to quantify social trust." },
        { title: "Brand Partners", desc: "Sponsor goods for Echo point redemption, turning marketing budget into tangible social impact." }
      ],
      form: {
        title: "Proposal",
        name: "Name / Organization",
        namePlace: "Your Name or Organization",
        email: "Email",
        message: "Message",
        messagePlace: "Briefly describe your proposal...",
        submit: "Submit Proposal",
        submitting: "Submitting...",
        error: "Submission failed, please try again.",
        successTitle: "Proposal Submitted",
        successDesc: "Thank you for reaching out. We will review it shortly.",
        new: "Send New Proposal"
      }
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setStatus('submitting');

    try {
      const response = await fetch(PARTNER_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...data, 
          source: "Partner Proposal Form",
          submitted_at: new Date().toLocaleString(),
          language: language
        }),
      });

      setStatus('success');
    } catch (error) {
      console.error("Partner submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="partners" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                {t.title}
              </h2>
              <p className="text-gray-500 text-xl leading-relaxed font-medium">
                {t.desc}
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-2xl">🤝</div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">{t.points[0].title}</h4>
                  <p className="text-gray-600 leading-relaxed">{t.points[0].desc}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center flex-shrink-0 text-2xl">📊</div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">{t.points[1].title}</h4>
                  <p className="text-gray-600 leading-relaxed">{t.points[1].desc}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-2xl">🎁</div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">{t.points[2].title}</h4>
                  <p className="text-gray-600 leading-relaxed">{t.points[2].desc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-[3rem] blur-2xl opacity-30 -z-10"></div>
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 max-w-lg mx-auto lg:ml-auto lg:mr-0 min-h-[500px] flex flex-col">
              {status !== 'success' ? (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-8 bg-purple-600 rounded-full"></div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{t.form.title}</h3>
                  </div>
                  <form className="space-y-6 flex-grow" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t.form.name}</label>
                      <input 
                        type="text" 
                        name="name_or_org" 
                        required 
                        className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-base font-medium text-gray-900 placeholder-gray-400" 
                        placeholder={t.form.namePlace} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t.form.email}</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-base font-medium text-gray-900 placeholder-gray-400" 
                        placeholder="contact@email.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t.form.message}</label>
                      <textarea 
                        name="message" 
                        required 
                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all h-28 text-base font-medium resize-none text-gray-900 placeholder-gray-400" 
                        placeholder={t.form.messagePlace}
                      ></textarea>
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="group w-full bg-gray-900 text-white py-4 rounded-xl font-black text-lg hover:bg-purple-700 transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98]">
                      {status === 'submitting' ? <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : t.form.submit}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-xs font-bold text-center">{t.form.error}</p>}
                  </form>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl">✅</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">{t.form.successTitle}</h3>
                    <p className="text-gray-500 font-medium">{t.form.successDesc}</p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="text-purple-600 font-black text-sm hover:underline">{t.form.new}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
