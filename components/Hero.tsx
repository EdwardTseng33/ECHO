
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type UserRole = 'professional' | 'student' | 'parent' | 'senior';

// 【已更新】Google Apps Script 網址
const HERO_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzE_gGxX6UB_58y_6Zboa-AO_xjs9nZXcxsGrlj3x4b94QbZucsbe2LoopOVVcuwAF2eQ/exec";

const DECORATIVE_NODES = [
  { top: '15%', left: '10%', size: 4, delay: '0s' },
  { top: '25%', left: '85%', size: 6, delay: '1.2s' },
  { top: '65%', left: '5%', size: 5, delay: '0.5s' },
  { top: '80%', left: '90%', size: 7, delay: '2.1s' },
  { top: '45%', left: '75%', size: 3, delay: '1.5s' },
  { top: '10%', left: '60%', size: 5, delay: '0.8s' },
];

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const t = {
    'zh-TW': {
      roles: {
        professional: { label: '職場玩家', icon: '⚔️' },
        student: { label: '校園新手', icon: '🛡️' },
        parent: { label: '家庭隊長', icon: '👑' },
        senior: { label: '傳奇導師', icon: '🧙‍♂️' }
      },
      // 中文：維持原本的視覺斷行
      title: <>別只在遊戲裡當英雄，<br className="sm:hidden" /><span className="text-gradient leading-[1.3] py-1 inline-block">來現實世界解任務</span>。</>,
      desc: <>ECHO 把枯燥的日常互助，變成一場場有意義的「副本」。<br className="hidden md:block" />發布任務給家人同事、組隊解決鄰里難題，<br className="hidden md:block" />這次掉落的不是虛擬金幣，而是讓你被真實看見的「感謝回聲」。</>,
      chooseRole: "選擇您的初始角色職業",
      placeholder: "輸入 Email，預約封測名額",
      cta: "預約搶先體驗",
      submitting: "提交中...",
      successTitle: "預約成功！",
      successDesc: <>您已列入 ECHO 首波冒險者候補名單。<br/>伺服器正在建設中，正式開服時將優先發送召集令給您！</>,
      back: "使用其他 Email 預約",
      error: "伺服器忙碌中，請稍後再試",
      invalidRole: "請選擇您的玩家類別",
      invalidEmail: "Email 格式似乎有誤"
    },
    'en-US': {
      roles: {
        professional: { label: 'Career Warrior', icon: '⚔️' },
        student: { label: 'Campus Rookie', icon: '🛡️' },
        parent: { label: 'Household Captain', icon: '👑' },
        senior: { label: 'Grand Mentor', icon: '🧙‍♂️' }
      },
      // 英文：使用 block 確保句子完整性，避免標點符號孤兒
      title: (
        <>
          <span className="block mb-1 md:mb-3">Don't just be a hero online.</span>
          <span className="text-gradient leading-[1.3] py-1 inline-block">Be a Legend in Reality.</span>
        </>
      ),
      desc: <>ECHO transforms mundane favors into Epic Quests. Issue challenges to colleagues, team up for neighborhood raids. The loot? Not virtual pixels, but genuine 'Echoes of Gratitude' that truly matter.</>,
      chooseRole: "Select Your Starting Class",
      placeholder: "Enter Email to Join the Waitlist",
      cta: "Pre-register Now",
      submitting: "Syncing...",
      successTitle: "You're on the List!",
      successDesc: <>You've secured a spot in the ECHO Vanguard.<br/>We'll summon you as soon as the servers go live!</>,
      back: "Register another email",
      error: "Server overloaded. Please retry.",
      invalidRole: "Please select a character class",
      invalidEmail: "Invalid email syntax"
    }
  }[language];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const px = (x - width / 2) / 40;
    const py = (y - height / 2) / 40;
    setMousePos({ x: px, y: py });

    if (Math.random() > 0.85) {
      const newRipple = { id: rippleIdRef.current++, x, y };
      setRipples(prev => [...prev.slice(-10), newRipple]);
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
    if (!role) { setStatus('invalid'); setErrorMessage(t.invalidRole); return; }
    if (!validateEmail(email)) { setStatus('invalid'); setErrorMessage(t.invalidEmail); return; }
    
    setStatus('submitting');
    try {
      const roleLabel = t.roles[role].label; // Use the localized label
      const response = await fetch(HERO_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          timestamp: new Date().toLocaleString(),
          email: email, 
          role: roleLabel,
          language: language,
          source: "Landing Page Hero"
        }),
      });
      
      setStatus('success');
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error'); 
      setErrorMessage(t.error);
    }
  };

  return (
    <header 
      ref={heroRef} 
      onMouseMove={handleMouseMove}
      className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 relative overflow-hidden flex flex-col items-center min-h-[90vh]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {ripples.map(ripple => (
          <div key={ripple.id} className="absolute border border-purple-400/30 rounded-full animate-ripple-out" style={{ left: ripple.x, top: ripple.y, width: '10px', height: '10px', transform: 'translate(-50%, -50%)' }} />
        ))}
        {DECORATIVE_NODES.map((node, i) => (
          <div key={i} className="absolute bg-purple-400/40 rounded-full blur-[1px] animate-pulse" style={{ top: node.top, left: node.left, width: `${node.size}px`, height: `${node.size}px`, animationDelay: node.delay, transform: `translate(${mousePos.x * (i % 2 === 0 ? 1.2 : -1.2)}px, ${mousePos.y * (i % 2 === 0 ? 1.2 : -1.2)}px)`, transition: 'transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)' }} />
        ))}
        <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-purple-300/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}></div>
        <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-pink-300/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000" style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}></div>
        <div className="absolute top-[40%] right-[20%] w-[30rem] h-[30rem] bg-blue-300/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
        <div className="reveal-text" style={{ animationDelay: '0.1s' }}>
          {/* 
            Typography Update:
            - text-4xl (Mobile): 稍微縮小，避免英文長句破版
            - sm:text-5xl (Small Tablet): 過渡平滑
            - md:text-7xl (Desktop): 保持大氣
            - lg:text-8xl (Large Desktop): 視覺衝擊
          */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-snug md:leading-tight mb-8 text-gray-900 tracking-tight px-2 drop-shadow-sm py-2">
            {t.title}
          </h1>
        </div>
        
        <div className="reveal-text" style={{ animationDelay: '0.3s' }}>
          <p className="text-lg md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light px-4">
            {t.desc}
          </p>
        </div>
        
        <div id="join" className="reveal-text max-w-xl mx-auto flex flex-col items-center gap-6 scroll-mt-32 w-full px-2 md:px-4" style={{ animationDelay: '0.5s' }}>
          {status !== 'success' ? (
            <div className="w-full space-y-6 md:space-y-8">
              <div className="space-y-4 w-full">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.chooseRole}</p>
                {/* 
                   佈局優化：
                   手機版 (default) grid-cols-2：英文文字較長，兩欄比較不擠。
                   平板 (sm) grid-cols-4：空間夠時四欄並排。
                   桌面 (md) flex：保持原本的彈性置中。
                */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:flex md:justify-center md:gap-3">
                  {(Object.keys(t.roles) as UserRole[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRole(key)}
                      className={`
                        p-2 md:px-5 md:py-2.5 rounded-2xl transition-all border-2 
                        flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2
                        h-full md:h-auto
                        ${role === key 
                          ? 'bg-purple-600 border-purple-600 text-white shadow-xl scale-105' 
                          : 'bg-white/80 border-gray-100 text-gray-500 hover:border-purple-200 hover:bg-white shadow-sm'
                        }
                      `}
                    >
                      <span className="text-xl md:text-lg leading-none">{t.roles[key].icon}</span>
                      <span className="text-[11px] md:text-sm font-bold whitespace-nowrap leading-tight">{t.roles[key].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full group">
                <form onSubmit={handleSubscribe} className={`w-full bg-white/90 backdrop-blur-sm p-1.5 md:p-2.5 rounded-full shadow-2xl border flex items-center transition-all duration-300 ${
                  (status === 'invalid' || status === 'error') ? 'border-red-400 animate-shake' : 'border-gray-100 hover:border-purple-200'
                }`}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 px-4 md:px-8 py-3 md:py-4 rounded-full outline-none text-gray-800 bg-transparent text-sm md:text-base font-medium min-w-0 placeholder-gray-400"
                    required 
                    disabled={status === 'submitting'}
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`px-5 md:px-10 py-3 md:py-4 rounded-full font-black text-sm md:text-lg transition-all duration-300 whitespace-nowrap shadow-lg flex items-center gap-2 ${
                      status === 'submitting' ? 'bg-gray-400' : 'bg-gray-900 text-white hover:bg-purple-700 active:scale-95'
                    }`}
                  >
                    {status === 'submitting' ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : t.cta}
                  </button>
                </form>
                {status === 'invalid' && errorMessage && <p className="absolute -bottom-8 left-6 text-red-500 text-xs font-bold animate-fade-in">{errorMessage}</p>}
              </div>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-md p-8 md:p-14 rounded-[3rem] border border-green-100 shadow-2xl flex flex-col items-center gap-6 animate-fade-in relative w-full border-t-4 border-t-green-500">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-lg shadow-green-100 animate-bounce">⏳</div>
              <div className="space-y-3">
                <p className="text-2xl md:text-3xl font-black text-gray-900">{t.successTitle}</p>
                <p className="text-base md:text-lg text-gray-600 font-medium">
                  {t.successDesc}
                </p>
              </div>
              <button onClick={() => setStatus('idle')} className="text-xs font-bold text-gray-400 hover:text-purple-600 transition-colors uppercase tracking-widest">{t.back}</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ripple-out { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; } 100% { transform: translate(-50%, -50%) scale(15); opacity: 0; } }
        .animate-ripple-out { animation: ripple-out 1.5s cubic-bezier(0, 0, 0.2, 1) forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </header>
  );
};
