
import React, { useState, useEffect, useRef } from 'react';

type UserRole = 'professional' | 'student' | 'parent' | 'senior' | 'other';

const roleData: Record<UserRole, { label: string, icon: string }> = {
  professional: { label: '職場青年', icon: '🧑‍💻' },
  student: { label: '在學學生', icon: '🎓' },
  parent: { label: '育兒家長', icon: '👶' },
  senior: { label: '退休人士', icon: '🍵' },
  other: { label: '其他', icon: '✨' }
};

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current && role) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 200;
        const y = (e.clientY - top - height / 2) / 200;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [role]);

  // Email 驗證函數
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // 1. 檢查是否選擇身分
    if (!role) {
      setStatus('invalid');
      setErrorMessage('請先選擇您的身分');
      return;
    }

    // 2. 檢查 Email 格式
    if (!validateEmail(email)) {
      setStatus('invalid');
      setErrorMessage('輸入資訊有誤，請檢查 Email 格式');
      return;
    }

    setStatus('submitting');
    
    try {
      const response = await fetch("https://formspree.io/f/mqaeapzo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email, 
          user_profile: roleData[role].label,
          _subject: `【ECHO 封測預約】來自 ${roleData[role].label}` 
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('伺服器忙碌中，請稍後再試');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('網路連線異常，請檢查您的網路');
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={heroRef} className="pt-48 pb-32 px-6 relative overflow-hidden flex flex-col items-center">
      {/* 互動式回聲背景環 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="echo-ring"
            style={{ 
              width: '450px', 
              height: '450px', 
              animation: role ? `pulse-ring ${10 + i * 2}s cubic-bezier(0.25, 0.1, 0.25, 1) infinite` : 'none',
              animationDelay: `${i * 2.5}s`,
              opacity: role ? 0.8 : 0,
              transition: 'opacity 2s ease-in-out'
            }}
          />
        ))}
      </div>

      {/* 視差背景球 */}
      <div 
        className={`absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${role ? 'animate-blob' : ''}`}
        style={{ 
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 2s cubic-bezier(0.1, 0.7, 0.1, 1), opacity 1.5s'
        }}
      ></div>
      <div 
        className={`absolute top-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${role ? 'animate-blob animation-delay-2000' : ''}`}
        style={{ 
          transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`,
          transition: 'transform 2.5s cubic-bezier(0.1, 0.7, 0.1, 1), opacity 1.5s'
        }}
      ></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="reveal-text" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-tight mb-8 text-gray-900 tracking-tight px-4">
            每一次互助，<br className="sm:hidden" />
            <span className="text-gradient">都值得一個回聲</span>。
          </h1>
        </div>
        
        <div className="reveal-text" style={{ animationDelay: '0.3s' }}>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light px-4">
            ECHO 將日常的微小協助轉化為真實的語音感謝。<br className="hidden md:block" />
            在數位時代，找回原本就屬於人的溫度與成就感。
          </p>
        </div>
        
        <div id="join" className="reveal-text max-w-xl mx-auto flex flex-col items-center gap-6 scroll-mt-32 w-full px-4" style={{ animationDelay: '0.5s' }}>
          {status !== 'success' ? (
            <div className="w-full space-y-8 animate-fade-in">
              <div className="space-y-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">請先選擇您的身分，讓我們更了解您</p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {(Object.keys(roleData) as UserRole[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setRole(key);
                        if (status === 'invalid' && errorMessage.includes('身分')) {
                          setStatus('idle');
                          setErrorMessage('');
                        }
                      }}
                      className={`px-4 md:px-5 py-2 md:py-2.5 rounded-2xl text-sm font-bold transition-all border-2 flex items-center gap-2 ${
                        role === key 
                          ? 'bg-purple-600 border-purple-600 text-white shadow-xl scale-105' 
                          : 'bg-white/80 border-gray-100 text-gray-500 hover:border-purple-200 hover:bg-white'
                      }`}
                    >
                      <span className={role === key ? "animate-float inline-block" : "inline-block"}>
                        {roleData[key].icon}
                      </span>
                      {roleData[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full group">
                <form onSubmit={handleSubscribe} className={`w-full bg-white p-2 md:p-2.5 rounded-full shadow-2xl border flex items-center transition-all duration-300 ${
                  (status === 'invalid' || status === 'error') ? 'border-red-400 shadow-red-100 animate-shake' : 'border-gray-100 hover:shadow-purple-200'
                }`}>
                  <input 
                    type="text" 
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'invalid' || status === 'error') {
                        setStatus('idle');
                        setErrorMessage('');
                      }
                    }}
                    placeholder="輸入您的常用 Email" 
                    className="flex-1 px-5 md:px-8 py-3 md:py-4 rounded-full outline-none text-gray-800 bg-transparent text-sm md:text-base"
                    required 
                    disabled={status === 'submitting'}
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-base md:text-lg transition-all duration-300 whitespace-nowrap shadow-lg flex items-center gap-2 ${
                      status === 'submitting' ? 'bg-gray-400' : 'bg-gray-900 text-white hover:bg-purple-700 md:hover:px-12'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : '預約封測'}
                  </button>
                </form>
                
                {/* 錯誤提示文字 */}
                {(status === 'invalid' || status === 'error') && errorMessage && (
                  <p className="absolute -bottom-8 left-6 text-red-500 text-xs font-bold animate-fade-in flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-md p-8 md:p-14 rounded-[3rem] border border-green-100 shadow-2xl flex flex-col items-center gap-6 animate-fade-in relative w-full">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-lg shadow-green-100 animate-bounce">✓</div>
              <div className="space-y-3">
                <p className="text-2xl md:text-3xl font-black text-gray-900">預約成功！</p>
                <div className="space-y-1">
                  <p className="text-base md:text-lg text-gray-600 font-medium">感謝您願意讓付出擁有回音。</p>
                  <p className="text-sm text-gray-500">我們已收到您的資訊，將於 2026 Q2 封測啟動時第一時間通知您。</p>
                </div>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="text-xs font-bold text-gray-400 hover:text-purple-600 transition-colors uppercase tracking-widest"
              >
                返回修改資料
              </button>
            </div>
          )}
          
          <div className="flex gap-4 items-center mt-6">
            <button 
              onClick={() => scrollTo('partners')}
              className="text-xs md:text-sm text-purple-600 font-black hover:text-purple-800 cursor-pointer flex items-center gap-1.5 transition-colors group"
            >
              或是成為 ECHO 的合作夥伴 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* 底部聲音波形點 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 opacity-5 pointer-events-none">
        {[1,2,3,4,5,6].map(i => (
          <div 
            key={i} 
            className={`w-1 md:w-1.5 bg-purple-500 rounded-full ${role ? 'animate-pulse' : ''}`} 
            style={{ 
              height: `${20 + Math.random() * 40}px`, 
              animationDelay: `${i * 0.5}s`, 
              animationDuration: '5s',
              transition: 'opacity 2s ease'
            }}
          ></div>
        ))}
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </header>
  );
};
