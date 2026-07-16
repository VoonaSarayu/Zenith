"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('Emily Park');
  const [password, setPassword] = useState('••••••••');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(formRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        router.push('/dashboard');
      }
    });

    // 1. Fade out the form
    tl.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in'
    }, 0);

    // 2. Expand the green overlay to cover the whole screen
    tl.to(overlayRef.current, {
      scaleY: 1,
      duration: 0.8,
      ease: 'expo.inOut'
    }, 0.2);

    // 3. Fade in "Welcome, Emily"
    tl.fromTo(welcomeTextRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    , 0.6);

    // 4. Hold the screen for a moment before routing
    tl.to({}, { duration: 0.5 });
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* GSAP Transition Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-[#005840] z-50 flex items-center justify-center origin-bottom"
        style={{ transform: 'scaleY(0)' }}
      >
        <h1 
          ref={welcomeTextRef}
          className="text-white text-5xl md:text-7xl font-display font-bold opacity-0"
        >
          Welcome, {username.split(' ')[0]}.
        </h1>
      </div>

      <div ref={formRef} className="w-full max-w-[1000px] bg-white rounded-[2rem] p-3 md:p-4 flex flex-col md:flex-row shadow-2xl z-10 border border-black/5">
        
        {/* Left Side: Gradient Banner */}
        <div className="w-full md:w-[45%] bg-[#005840] rounded-[1.5rem] p-10 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Mesh gradient effect */}
          <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-[#D1F843] blur-[120px] rounded-full opacity-40 mix-blend-overlay"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] bg-blue-500 blur-[100px] rounded-full opacity-30 mix-blend-overlay"></div>
          
          <div className="flex items-center z-10">
            <img src="/samsung-logo-blue.png" alt="Samsung" className="h-6 object-contain brightness-0 invert" />
            <div className="h-6 w-px bg-white/20 mx-4"></div>
            <span className="font-logo font-bold text-3xl tracking-normal text-white mt-1">Zenith🍃</span>
          </div>
          
          <div className="relative z-10 mt-32">
            <p className="text-white/80 font-bold mb-3 uppercase tracking-widest text-xs">Zenith Clinical Hub</p>
            <h2 className="text-white text-[2.5rem] font-bold font-display leading-[1.1] tracking-tight">
              Access your physiological metrics and predictive protocols.
            </h2>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center">
          <div className="text-[#005840] text-4xl font-display font-bold leading-none mb-6">*</div>
          <h1 className="text-4xl font-bold font-display text-gray-900 mb-3 tracking-tight">Sign in to Zenith</h1>
          <p className="text-gray-500 mb-10 text-sm font-medium">Access your tasks, clinical notes, and health insights anytime, anywhere - and keep everything flowing in one place.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Patient ID</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005840]/20 focus:border-[#005840] transition-all font-medium shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Passkey</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005840]/20 focus:border-[#005840] transition-all font-medium tracking-widest shadow-sm"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isAuthenticating}
              className="w-full bg-[#005840] text-white font-bold text-base rounded-xl py-4 mt-2 hover:bg-[#004834] transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-[#005840]/30"
            >
              {isAuthenticating ? 'Authenticating...' : 'Access Dashboard'}
            </button>

            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-xs text-gray-400 font-bold uppercase tracking-wider">or authenticate via</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="flex gap-3">
              <button type="button" className="flex-1 py-3 bg-white rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                <span className="text-[#1428A0] font-bold">S</span> Health
              </button>
              <button type="button" className="flex-1 py-3 bg-white rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                <span className="text-gray-900 font-bold">G</span> Ring
              </button>
            </div>
            
            <p className="text-center text-sm font-medium text-gray-500 mt-6">
              Don't have a profile? <a href="#" className="text-[#005840] hover:underline font-bold">Contact Admin</a>
            </p>
          </form>
        </div>

      </div>
    </main>
  );
}
