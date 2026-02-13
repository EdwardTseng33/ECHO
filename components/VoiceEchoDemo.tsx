
import React, { useState } from 'react';
import { generateGratitudeEcho } from '../services/geminiService';

export const VoiceEchoDemo: React.FC = () => {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [echo, setEcho] = useState<{ text: string; persona: string } | null>(null);

  const simulateEcho = async () => {
    if (!task) return;
    setLoading(true);
    const result = await generateGratitudeEcho(task);
    setEcho(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-black tracking-widest uppercase mb-4">
          Interactive Experience
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">體驗一聲「回響」</h2>
        <p className="text-gray-600 text-lg">輸入一個你在鄰里、公司或家中的微小付出...</p>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 md:p-14 shadow-xl border-white/40">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest ml-1">任務描述</label>
            <textarea 
              rows={3}
              placeholder="例如：幫加班的同事訂晚餐、幫隔壁太太顧小孩10分鐘..." 
              className="w-full px-6 py-5 rounded-2xl border border-purple-100 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all shadow-inner bg-white/50 resize-none text-base"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="flex flex-wrap gap-3">
               {['幫同事分擔報告', '幫鄰居提重物', '幫父母設定電腦'].map(tag => (
                 <button 
                    key={tag} 
                    onClick={() => setTask(tag)}
                    className="text-sm px-4 py-1.5 bg-gray-100 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-700 font-bold transition-colors"
                 >
                   {tag}
                 </button>
               ))}
            </div>
            <button 
              onClick={simulateEcho}
              disabled={loading || !task}
              className={`w-full py-5 rounded-2xl font-black text-lg text-white transition-all transform active:scale-95 flex items-center justify-center gap-3 ${
                loading || !task ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:shadow-purple-200 shadow-lg'
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
                  發送回聲
                </>
              )}
            </button>
          </div>

          <div className="flex-1 bg-white/95 rounded-[2.5rem] p-10 border border-purple-100 flex flex-col items-center justify-center min-h-[300px] relative shadow-sm">
            {echo ? (
              <div className="text-center animate-fade-in space-y-8 w-full">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-3xl shadow-sm">
                    {echo.persona.includes('奶奶') ? '👵' : echo.persona.includes('媽') ? '👩‍👧' : '🧑‍💻'}
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-black tracking-wide">
                    {echo.persona}
                  </div>
                </div>
                <div className="text-gray-900 text-xl font-bold leading-relaxed italic px-2">
                  「 {echo.text} 」
                </div>
                <div className="flex items-center justify-center gap-1.5 h-10">
                   {[1,2,3,4,5,6,7,8,9,10].map(i => (
                     <div key={i} className="w-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s`, height: `${20 + Math.random() * 30}px` }}></div>
                   ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <p className="text-base font-bold tracking-tight">填寫左側內容，模擬接收感謝...</p>
              </div>
            )}
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-20">
               <span className="text-xs font-black tracking-[0.4em] uppercase text-gray-500">Echo Protocol v1.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
