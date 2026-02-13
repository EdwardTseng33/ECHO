
import React, { useState, useEffect, useRef, useCallback } from 'react';

type UserRole = 'professional' | 'student' | 'parent' | 'senior';

const roleData: Record<UserRole, { label: string, icon: string }> = {
  professional: { label: '職場青年', icon: '🧑‍💻' },
  student: { label: '在學學生', icon: '🎓' },
  parent: { label: '育兒家長', icon: '👶' },
  senior: { label: '退休人士', icon: '🍵' }
};

const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE";

const DECORATIVE_NODES = [
  { top: '15%', left: '10%', size: 4, delay: '0s' },
  { top: '25%', left: '85%', size: 6, delay: '1.2s' },
  { top: '65%', left: '5%', size: 5, delay: '0.5s' },
  { top: '80%', left: '90%', size: 7, delay: '2.1s' },
];

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const px = (x - width / 2) / 40;
    const py = (y - height / 2) / 40;
    setMousePos({ x: px, y: py });

    // 滑鼠移動時隨機產生小波紋
    if (Math.random() > 0.9) {
      const newRipple = { id: rippleIdRef.current++, x, y };
      setRipples(prev => [...prev.slice(-8), newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 2000);
    }
  }, []);

  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!role) { setStatus('invalid'); setErrorMessage('請先選擇您的身分'); return; }
    if (!validateEmail(email)) { setStatus('invalid'); setErrorMessage('Email 格式不正確'); return; }
    
    setStatus('submitting');
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          email: email, 
          role: roleData[role].label,
          type: "預約封測"
        }),
      });
      setStatus('success');
    } catch (error) {
      setStatus('error'); 
      setErrorMessage('連線異常，請稍後再試');
    }
  };

  return (
    <header 
      ref={heroRef} 
      onMouseMove={handleMouseMove}
      className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 relative overflow-hidden flex flex-col items-center min-h-[90vh] md:min-h-screen justify-center"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* 水波紋動態層 */}
        {ripples.map(ripple => (
          <div key={ripple.id} className="absolute border border-purple-400/20 rounded-full animate-ripple-out" style={{ left: ripple.x, top: ripple.y, width: '20px', height: '20px', transform: 'translate(-50%, -50%)' }} />
        ))}
        {DECORATIVE_NODES.map((node, i) => (
          <div key={i} className="absolute bg-purple-400/20 rounded-full blur-[2px] animate-pulse" style={{ top: node.top, left: node.left, width: `${node.size}px`, height: `${node.size}px`, animationDelay: node.delay, transform: `translate(${mousePos.x * (i % 2 === 0 ? 1 : -1)}px, ${mousePos.y * (i % 2 === 0 ? 1 : -1)}px)`, transition: 'transform 1s cubic-bezier(0.1, 0, 0.2, 1)' }} />
        ))}
        <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-purple-300/10 rounded-full filter blur-[80px] animate-blob"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[25rem] h-[25rem] bg-pink-300/10 rounded-full filter blur-[80px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
        <div className="reveal-text" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-black leading-tight mb-6 md:mb-10 text-gray-900 tracking-tighter px-2">
            每一次互助，<br className="sm:hidden" />
            <span className="text-gradient">都值得回聲</span>。
          </h1>
        </div>
        
        <div className="reveal-text" style={{ animationDelay: '0.3s' }}>
          <p className="text-lg md:text-2xl text-gray-600 mb-10 md:mb-16 max-w-2xl mx-auto leading-relaxed font-bold px-4">
            ECHO 將日常的微小協助轉化為真實的語音感謝。<br className="hidden md:block" />
            在數位時代，找回原本就屬於人的溫度與成就感。
          </p>
        </div>
        
        <div id="join" className="reveal-text max-w-3xl mx-auto flex flex-col items-center gap-8 md:gap-12 scroll-mt-32 w-full px-2" style={{ animationDelay: '0.5s' }}>
          {status !== 'success' ? (
            <div className="w-full space-y-10">
              <div className="space-y-5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">請選擇身分，讓我們更了解您</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
                  {(Object.keys(roleData) as UserRole[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRole(key)}
                      className={`p-5 md:p-8 rounded-[2rem] text-sm md:text-base font-black transition-all border-2 flex flex-col items-center gap-3 ${
                        role === key ? 'bg-purple-600 border-purple-500 text-white shadow-xl scale-105' : 'bg-white/80 border-gray-100 text-gray-500 hover:border-purple-200'
                      }`}
                    >
                      <span className="text-3xl md:text-4xl">{roleData[key].icon}</span>
                      <span className="whitespace-nowrap">{roleData[key].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full max-w-lg mx-auto group">
                <form onSubmit={handleSubscribe} className={`w-full bg-white/95 p-2 md:p-3 rounded-full shadow-2xl border flex flex-col sm:flex-row items-center transition-all ${
                  (status === 'invalid' || status === 'error') ? 'border-red-400 animate-shake' : 'border-gray-100 focus-within:border-purple-500'
                }`}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="輸入您的常用 Email" 
                    className="flex-1 w-full px-6 md:px-8 py-3 md:py-4 rounded-full outline-none text-gray-900 bg-transparent text-base md:text-lg font-bold placeholder-gray-300 text-center sm:text-left"
                    required 
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`w-full sm:w-auto px-10 py-4 md:py-5 rounded-full font-black text-lg transition-all duration-300 shadow-xl ${
                      status === 'submitting' ? 'bg-gray-400' : 'bg-gray-900 text-white hover:bg-purple-700 active:scale-95'
                    }`}
                  >
                    {status === 'submitting' ? '...' : '立即預約'}
                  </button>
                </form>
                {status === 'invalid' && errorMessage && <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-red-500 text-xs font-black animate-fade-in">{errorMessage}</p>}
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 md:p-20 rounded-[4rem] border-4 border-purple-500 shadow-2xl flex flex-col items-center gap-8 animate-scale-up w-full">
              <div className="text-7xl animate-bounce">🌟</div>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900">預約成功！</h3>
              <p className="text-gray-500 font-bold">期待在社群中聽見您的回聲。</p>
              <button onClick={() => setStatus('idle')} className="text-xs font-black text-gray-400 hover:text-purple-600 uppercase tracking-widest">返回修改資料</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ripple-out { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; } 100% { transform: translate(-50%, -50%) scale(20); opacity: 0; } }
        .animate-ripple-out { animation: ripple-out 2s cubic-bezier(0, 0, 0.2, 1) forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        @keyframes scale-up { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-up { animation: scale-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </header>
  );
};
