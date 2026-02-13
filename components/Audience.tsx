
import React from 'react';

const CheckItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-4 text-base text-gray-300 mt-4 group">
    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
      <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="font-medium">{text}</span>
  </div>
);

export const Audience: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(126,34,206,0.1),transparent)]"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">應用場景</h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">ECHO 適用於各種需要建立互助機制的群體與組織。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-stretch">
          
          {/* Families */}
          <div className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col group hover:bg-white/[0.08] transition-all shadow-2xl">
            <h3 className="text-2xl font-black mb-4 text-purple-300">育兒家庭</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              建立鄰里托育支援，為家長提供臨時性的互助網絡。
            </p>
            <div className="mt-auto border-t border-white/5 pt-6">
              <CheckItem text="鄰里托育系統" />
              <CheckItem text="親子共伴地圖" />
            </div>
          </div>

          {/* Workplace */}
          <div className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col group hover:bg-white/[0.08] transition-all shadow-2xl">
            <h3 className="text-2xl font-black mb-4 text-blue-300">企業組織</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              記錄同事間的非正式支援，量化並保存團隊內的善意互動。
            </p>
            <div className="mt-auto border-t border-white/5 pt-6">
              <CheckItem text="心理安全感指標" />
              <CheckItem text="同儕激勵系統" />
            </div>
          </div>

          {/* Elders/Youth */}
          <div className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col group hover:bg-white/[0.08] transition-all shadow-2xl">
            <h3 className="text-2xl font-black mb-4 text-pink-300">高齡與社區</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              交換數位技能與人生閱歷，強化跨代間的溝通與理解。
            </p>
            <div className="mt-auto border-t border-white/5 pt-6">
              <CheckItem text="跨代技能交換" />
              <CheckItem text="語音互動介面" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
