
import React, { useState } from 'react';

type UserRole = 'professional' | 'student' | 'parent' | 'senior' | 'other';

const roleLabels: Record<UserRole, string> = {
  professional: '職場青年',
  student: '在學學生',
  parent: '育兒家長',
  senior: '退休人士',
  other: '其他'
};

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) return;

    setStatus('submitting');
    
    try {
      const response = await fetch("https://formspree.io/f/mqaeapzo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email, 
          role: roleLabels[role],
          _subject: `ECHO 新用戶預約: ${roleLabels[role]}` 
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setRole(null);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="pt-48 pb-32 px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 text-gray-900 tracking-tight">
          每一次互助，<br />
          <span className="text-gradient">都值得一個回聲</span>。
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          ECHO 將日常的微小協助轉化為真實的語音感謝。<br />
          在數位時代，找回原本就屬於人的溫度與成就感。
        </p>
        
        <div id="join" className="max-w-xl mx-auto flex flex-col items-center gap-6 scroll-mt-32">
          {status !== 'success' ? (
            <div className="w-full space-y-6">
              {/* Profile Selector */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">請選擇您的主要身分</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {(Object.keys(roleLabels) as UserRole[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRole(key)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                        role === key 
                          ? 'bg-purple-600 border-purple-600 text-white shadow-lg' 
                          : 'bg-white border-gray-100 text-gray-500 hover:border-purple-200'
                      }`}
                    >
                      {roleLabels[key]}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="w-full bg-white p-2.5 rounded-full shadow-2xl border border-gray-100 flex items-center transform transition-all hover:shadow-purple-200">
                <input 
                  type="email" 
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="輸入 Email 獲取封測資格" 
                  className="flex-1 px-8 py-4 rounded-full outline-none text-gray-800 bg-transparent text-base"
                  required 
                  disabled={status === 'submitting'}
                />
                <button 
                  type="submit" 
                  disabled={status === 'submitting' || !role}
                  className={`px-10 py-4 rounded-full font-black text-lg transition duration-300 whitespace-nowrap shadow-lg flex items-center gap-2 ${
                    !role ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-purple-700'
                  }`}
                >
                  {status === 'submitting' ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : '預約封測'}
                </button>
              </form>
              
              {!role && <p className="text-xs text-gray-400 animate-pulse font-medium">請先選擇身分後再輸入 Email 預約</p>}
              
              {status === 'error' && (
                <p className="text-red-500 text-sm font-bold mt-4">抱歉，送出時發生錯誤，請稍後再試。</p>
              )}
            </div>
          ) : (
            <div className="bg-green-50 text-green-700 px-8 py-10 rounded-[2.5rem] border border-green-200 font-bold text-lg flex flex-col items-center gap-3 animate-fade-in shadow-xl">
              <span className="text-4xl">✨</span>
              <div className="space-y-1">
                <p className="text-xl font-black">預約成功！</p>
                <p className="text-sm font-medium opacity-80">感謝您提供身分資訊，這將幫助我們優化封測體驗。</p>
              </div>
            </div>
          )}
          
          <div className="flex gap-4 items-center mt-4">
            <button 
              onClick={() => scrollTo('partners')}
              className="text-sm text-purple-600 font-black hover:text-purple-800 cursor-pointer flex items-center gap-1.5 transition-colors group"
            >
              成為合作夥伴 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
