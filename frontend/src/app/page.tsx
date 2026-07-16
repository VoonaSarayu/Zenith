import Link from 'next/link';
import React from 'react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F2F1EC] font-sans overflow-x-hidden selection:bg-[#005840] selection:text-white">
      
      <nav className="flex justify-between items-center px-8 md:px-12 py-8 max-w-[1800px] mx-auto relative z-30">
        <div className="flex items-center">
          <img src="/samsung-logo-blue.png" alt="Samsung" className="h-4 md:h-10 object-contain" />
          <div className="h-6 w-px bg-[#1428A0]/20 mx-4 md:mx-5"></div>
          <span className="font-logo font-bold text-3xl md:text-4xl tracking-normal text-[#005840] mt-1">Zenith</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 font-bold text-sm text-[#005840]">
          <Link href="#" className="hover:text-black transition-colors">Galaxy integration</Link>
          <Link href="#" className="hover:text-black transition-colors">Clinical validity</Link>
          <Link href="#" className="hover:text-black transition-colors">How it works</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="hidden md:block font-bold text-sm text-[#005840] hover:text-black transition-colors">Log in</Link>
          <Link href="/dashboard" className="bg-[#005840] text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-black transition-all hover:scale-105">
            Get started
          </Link>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 md:px-12 pt-10 pb-24">
        
        <div className="relative bg-[#D1F843] rounded-[2.5rem] md:rounded-[4rem] w-full min-h-[550px] md:min-h-[600px] flex flex-col md:flex-row items-center px-8 md:px-20 pt-16 md:pt-0 shadow-sm overflow-visible border border-black/5">
          
          <div className="w-full md:w-[55%] z-10 flex flex-col justify-center pb-12 md:pb-0 md:py-20">
            <h1 className="font-display text-6xl md:text-[7rem] font-bold leading-[0.85] tracking-tighter text-[#005840] mb-8">
              Peak<br />
              health,<br />
              synced.
            </h1>
            <p className="text-lg md:text-xl font-bold text-[#005840]/70 mb-10 max-w-md leading-relaxed tracking-wide">
              Transform your Galaxy Ring and Watch data into actionable behavioral protocols. Seamlessly.
            </p>
            <div>
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center bg-[#005840] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-black transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-[#005840]/20"
              >
                Launch Dashboard
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[45%] absolute right-0 bottom-0 top-[-100%] pointer-events-none overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]">
            <img 
              src="/mockup.png" 
              alt="Zenith Dashboard on Phone Mockup" 
              className="absolute -bottom-20 md:-bottom-25 right-[-20px] md:right-8 w-auto h-[750px] md:h-[1100px] max-h-none object-contain object-right-bottom drop-shadow-2xl"
            />
          </div>
          
        </div>
      </div>

      <div className="bg-[#005840] text-white py-24 md:py-32 rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">The future of Samsung Health.</h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">Zenith doesn't just track your metrics. It uses behavioral psychology and ecosystem automation to actively optimize your physiology.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#D1F843] flex items-center justify-center mb-8">
                <span className="text-3xl">🌙</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Circadian Sync</h3>
              <p className="text-white/70 leading-relaxed font-medium">Align your habits with natural physiological rhythms. Validated automatically via Galaxy Ring sleep staging.</p>
            </div>
            
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#41D58C] flex items-center justify-center mb-8">
                <span className="text-3xl text-black">🔗</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">SmartThings Logic</h3>
              <p className="text-white/70 leading-relaxed font-medium">Automate your environment. Zenith adjusts your room temperature and lighting based on real-time recovery metrics.</p>
            </div>
            
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-8">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Predictive Intel</h3>
              <p className="text-white/70 leading-relaxed font-medium">Don't just track data. Execute behavioral protocols generated dynamically to optimize your daily physiological output.</p>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}
