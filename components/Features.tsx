
import React from 'react';

const featureList = [
  {
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "跨代與育兒互助",
    desc: "連結鄰里資源，讓退休長者與家庭建立支援網絡，協助育兒或日常需求。",
    bgColor: "hover:bg-purple-50"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: "職場共鳴回聲",
    desc: "在職場環境中記錄夥伴間的日常協助，將肯定轉化為可留存的語音回饋。",
    bgColor: "hover:bg-pink-50"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "信任履歷系統",
    desc: "透過去中心化方式記錄善意行為，累積個人在不同社群間的信用評價。",
    bgColor: "hover:bg-blue-50"
  }
];

export const Features: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 tracking-tight">運作模式</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            ECHO 透過任務與語音回饋，在各種場景建立互助循環。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {featureList.map((f, i) => (
            <div key={i} className={`group p-10 rounded-[3rem] bg-gray-50 ${f.bgColor} transition duration-500 border border-gray-100 flex flex-col h-full relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1`}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">{f.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed flex-grow">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-[3rem] p-8 md:p-12 border-purple-50 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h4 className="text-2xl font-bold mb-4 text-gray-900">雙向反饋機制</h4>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              每一次的協助完成後，接收方可錄製一段感謝語音。這份真實的反饋是系統的核心動力，確保互助行為能夠持續循環。
            </p>
            <div className="grid grid-cols-3 gap-4">
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-purple-600 tracking-tighter">社區</span>
                  <span className="text-sm text-gray-500 font-medium italic">鄰里互助</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-pink-600 tracking-tighter">育兒</span>
                  <span className="text-sm text-gray-500 font-medium italic">家庭支援</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-blue-600 tracking-tighter">職場</span>
                  <span className="text-sm text-gray-500 font-medium italic">同事協作</span>
               </div>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
             <div className="aspect-square bg-purple-50 rounded-3xl flex items-center justify-center p-6 text-center shadow-inner">
                <span className="text-sm md:text-base text-purple-800 font-bold italic leading-relaxed">「謝謝你幫我接小孩，今天真的忙不過來...」</span>
             </div>
             <div className="aspect-square bg-pink-50 rounded-3xl flex items-center justify-center p-6 text-center mt-8 shadow-inner border border-pink-100/50">
                <span className="text-sm md:text-base text-pink-800 font-bold italic leading-relaxed">「那個程式 Bug 困擾我好久，謝謝你幫我看！」</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
