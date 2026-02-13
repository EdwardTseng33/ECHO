import React, { useState, useEffect, useRef } from 'react';

type UserRole = 'professional' | 'student' | 'parent' | 'senior';

const roleData: Record<UserRole, { label: string, icon: string }> = {
  professional: { label: '職場青年', icon: '🧑‍💻' },
  student: { label: '在學學生', icon: '🎓' },
  parent: { label: '育兒家長', icon: '👶' },
  senior: { label: '退休人士', icon: '🍵' }
};

// 請在此替換您的 Google Apps Script 部署網址
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE";

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'invalid'>('idle');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) { setStatus('invalid'); return; }
    if (!email.match(/^\S+@\S+\.\S+$/)) { setStatus('invalid'); return; }
    
    setStatus('submitting');
    try {
      // 在 no-cors 模式下，不設定 headers 以避免 CORS 預檢失敗
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          targetSheet: "Users", 
          email, 
          role: roleData[role].label,
          timestamp: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
        }),
      });
      // no-cors 下無法獲取 response，假設成功
      setStatus('success');
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <header ref={heroRef} className="pt-24 pb-16 md:pt-48 md:pb-32 px-4 relative overflow-hidden flex flex-col items-center min-h-screen justify-center">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[700px] border border-purple-200/20 rounded-full transition-transform duration-700 ease-out"
          style={{ transform: `translate(calc(-50% + var(--mouse-x, 0px)), calc(-50% + var(--mouse-y, 0px)))` }}
        ></div>
        <div className="absolute top-[10%] left-[5%] w-[20rem] h-[20rem] bg-purple-300/10 rounded-full filter blur-[80px] animate-blob"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[15rem] h-[15rem] bg-pink-300/10 rounded-full filter blur-[80px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 w-full px-2">
        <div className="reveal-text">
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-black leading-tight mb-6 md:mb-10 text-gray-900 tracking-tighter">
            每一次互助，<br />
            <span className="text-gradient">都值得回聲</span>。
          </h1>
        </div>
        
        <div className="reveal-text" style={{ animationDelay: '0.2s' }}>
          <p className="text-base md:text-2xl text-gray-500 mb-10 md:mb-16 max-w-2xl mx-auto font-bold px-4 leading-relaxed">
            ECHO 將微小協助轉化為真實的語音感謝與實質獎勵。<br className="hidden md:block" />
            在數位時代，找回原本就屬於人的溫度與成就感。
          </p>
        </div>
        
        <div id="join" className="reveal-text max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-12 w-full px-2" style={{ animationDelay: '0.4s' }}>
          {status !== 'success' ? (
            <div className="w-full space-y-8 md:space-y-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">請先選擇您的身分，讓我們更了解您</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
                  {(Object.keys(roleData) as UserRole[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRole(key)}
                      className={`p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] transition-all border-2 flex flex-col items-center gap-2 md:gap-3 active:scale-95 ${
                        role === key 
                        ? 'bg-purple-600 border-purple-500 text-white shadow-xl scale-105' 
                        : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200 shadow-sm'
                      }`}
                    >
                      <span className="text-2xl md:text-4xl">{roleData[key].icon}</span>
                      <span className="text-xs md:text-base font-black whitespace-nowrap">{roleData[key].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full max-w-lg mx-auto">
                <form onSubmit={handleSubscribe} className={`w-full bg-white p-1.5 md:p-2 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border flex flex-col sm:flex-row items-center transition-all ${
                  status === 'invalid' ? 'border-red-400 animate-shake' : 'border-gray-50 focus-within:border-purple-500'
                }`}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="輸入您的常用 Email" 
                    className="flex-1 w-full px-6 py-4 rounded-full outline-none text-gray-900 bg-transparent text-base md:text-lg font-bold placeholder-gray-300 text-center sm:text-left"
                    required 
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`w-full sm:w-auto px-10 py-4 md:py-5 rounded-full font-black text-lg transition-all duration-300 shadow-xl active:scale-95 ${
                      status === 'submitting' ? 'bg-gray-300' : 'bg-gray-900 text-white hover:bg-purple-600'
                    }`}
                  >
                    {status === 'submitting' ? '傳送中...' : '立即加入'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 md:p-20 rounded-[4rem] border-4 border-purple-500 shadow-2xl flex flex-col items-center gap-8 animate-scale-up w-full max-w-lg">
              <div className="text-6xl md:text-7xl animate-bounce">🌟</div>
              <h3 className="text-2xl md:text-4xl font-black text-gray-900">預約成功！</h3>
              <button onClick={() => setStatus('idle')} className="text-xs font-black text-gray-400 hover:text-purple-600 uppercase tracking-widest underline underline-offset-4">返回修改</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        @keyframes scale-up { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-up { animation: scale-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </header>
  );
};
