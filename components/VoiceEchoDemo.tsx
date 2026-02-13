
import React, { useState } from 'react';
import { generateGratitudeEcho } from '../services/geminiService';

export const VoiceEchoDemo: React.FC = () => {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [echo, setEcho] = useState<{ text: string; persona: string } | null>(null);

  const simulateEcho = async () => {
    if (!task) return;
    setLoading(true);
    setEcho(null); // Clear previous result
    const result = await generateGratitudeEcho(task);
    setEcho(result);
    setLoading(false);
  };

  const presetTags = [
    '順手幫同事買咖啡', 
    '幫鄰居收包裹', 
    '教爸媽用手機掛號', 
    '幫忙照顧半小時小孩'
  ];

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-black tracking-widest uppercase mb-4 animate-pulse">
          Quest Simulation
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">任務回報區</h2>
        <p className="text-gray-600 text-lg">假設你剛剛完成了一個現實生活中的任務。<br/>輸入內容，領取你的「聲音獎勵」。</p>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 md:p-14 shadow-xl border-white/40">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Input Section */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <label className="block text-sm font-black text-gray-400 uppercase tracking-widest">任務日誌 (Quest Log)</label>
            </div>
            
            <textarea 
              rows={3}
              placeholder="請輸入你完成的任務內容... (例如：看到鄰居提重物，順手幫了一把)" 
              className="w-full px-6 py-5 rounded-2xl border border-purple-100 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all shadow-inner bg-white/50 resize-none text-base text-gray-900 placeholder-gray-400"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
               {presetTags.map(tag => (
                 <button 
                    key={tag} 
                    onClick={() => setTask(tag)}
                    className="text-xs md:text-sm px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-500 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 font-medium transition-all"
                 >
                   {tag}
                 </button>
               ))}
            </div>
            <button 
              onClick={simulateEcho}
              disabled={loading || !task}
              className={`w-full py-5 rounded-2xl font-black text-lg text-white transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 ${
                loading || !task ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-900 hover:bg-purple-700 shadow-lg hover:shadow-purple-200'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                   獎勵計算中...
                </span>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  回報任務完成
                </>
              )}
            </button>
          </div>

          {/* Result Section (Quest Complete Look) */}
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-[2.5rem] p-8 border border-gray-100 flex flex-col items-center justify-center min-h-[300px] relative shadow-inner overflow-hidden">
            
            {/* Loading State: Sound Wave */}
            {loading && (
              <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                 <div className="flex items-end gap-1 h-12">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 bg-purple-500 rounded-full animate-sound-wave" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                 </div>
                 <p className="text-purple-600 font-bold text-sm tracking-widest animate-pulse">正在生成回聲獎勵...</p>
              </div>
            )}

            {echo ? (
              <div className="w-full animate-fade-in relative z-0">
                <div className="text-center mb-6">
                   <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-black rounded-full mb-2 shadow-sm uppercase tracking-wider">Quest Complete!</span>
                   <h3 className="text-xl font-black text-gray-900">獲得回聲</h3>
                </div>

                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-lg shadow-sm border-2 border-white">
                    {echo.persona.includes('阿姨') || echo.persona.includes('奶奶') ? '👵' : echo.persona.includes('媽') ? '👩' : echo.persona.includes('伯') ? '👴' : '🧑‍💻'}
                  </div>
                  <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">任務發布者</p>
                     <p className="text-gray-900 font-bold text-sm leading-none">{echo.persona}</p>
                  </div>
                </div>

                {/* Message Bubble */}
                <div className="bg-purple-600 rounded-2xl rounded-tl-none p-6 shadow-lg shadow-purple-200 relative mb-4">
                   <div className="absolute top-0 left-0 -mt-2 -ml-2 w-4 h-4 bg-purple-600 transform rotate-45"></div>
                   <p className="text-white text-lg font-medium leading-relaxed tracking-wide">
                     {echo.text}
                   </p>
                </div>

                {/* Loot Visualizer */}
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 px-2">
                   <span>EXP +50</span>
                   <span>社會資本 UP</span>
                </div>
              </div>
            ) : (
              !loading && (
                <div className="text-center text-gray-400">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                    <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-base font-bold tracking-tight">等待任務回報中...</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
