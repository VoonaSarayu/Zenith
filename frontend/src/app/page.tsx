"use client"
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLImageElement>(null);
  const darkSectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.hero-anim', 
      { y: 80, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' }
    );
    tl.fromTo(mockupRef.current, 
      { y: 300, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }, 
      "-=0.8"
    );

    gsap.to(mockupRef.current, {
      yPercent: 15,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.fromTo(darkSectionRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: darkSectionRef.current,
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo('.feature-card', 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 85%',
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo('.circle-reveal-section', 
      { clipPath: 'circle(0% at 50% 100%)' }, 
      { 
        clipPath: 'circle(150% at 50% 100%)', 
        ease: 'none',
        scrollTrigger: {
          trigger: '.circle-reveal-container',
          start: 'top top', 
          end: '+=100%',   
          scrub: 1,        
          pin: true        
        }
      }
    );
  }, []);

  return (
    <main className="min-h-screen bg-[#F2F1EC] font-sans overflow-x-hidden selection:bg-[#005840] selection:text-white">
      
      <nav className="flex justify-between items-center px-8 md:px-12 py-8 max-w-[1800px] mx-auto relative z-30">
        <div className="flex items-center">
          <img src="/samsung-logo-blue.png" alt="Samsung" className="h-4 md:h-10 object-contain" />
          <div className="h-6 w-px bg-[#1428A0]/20 mx-4 md:mx-5"></div>
          <span className="font-logo font-bold text-3xl md:text-4xl tracking-normal text-[#005840] mt-1">Zenith🍃</span>
        </div>
        


        <div className="flex items-center gap-6">
          <Link href="/login" className="hidden md:block font-bold text-sm text-[#005840] hover:text-black transition-colors">Log in</Link>
          <Link href="/login" className="bg-[#005840] text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-black transition-all hover:scale-105">
            Get started
          </Link>
        </div>
      </nav>

      <div ref={heroRef} className="max-w-[1400px] mx-auto px-4 md:px-12 pt-20 md:pt-24 pb-24">
        
        <div className="relative bg-[#D1F843] rounded-[2.5rem] md:rounded-[4rem] w-full min-h-[600px] md:min-h-[750px] flex flex-col md:flex-row items-center px-8 md:px-16 lg:px-24 pt-16 md:pt-0 shadow-sm overflow-visible border border-black/5">
          
          <div className="w-full md:w-[55%] z-10 flex flex-col justify-center pb-16 md:pb-0 md:py-16 pl-2 md:pl-8 lg:pl-12">
            <h1 className="hero-anim font-display text-6xl md:text-[6.5rem] font-bold leading-[0.85] tracking-tighter text-[#005840] mb-8">
              Peak<br />
              health,<br />
              synced.
            </h1>
            <p className="hero-anim text-lg md:text-xl font-bold text-[#005840]/70 mb-10 max-w-md leading-relaxed tracking-wide">
              Transform your Galaxy Ring and Watch data into actionable behavioral protocols. Seamlessly.
            </p>
            <div className="hero-anim">
              <Link 
                href="/login"
                className="inline-flex items-center justify-center bg-[#005840] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-black transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-[#005840]/20"
              >
                Launch Dashboard
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[45%] absolute right-0 bottom-0 top-[-200%] pointer-events-none overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]">
            <img 
              ref={mockupRef}
              src="/mockup.png" 
              alt="Zenith Dashboard on Phone Mockup" 
              className="absolute -bottom-20 md:-bottom-35 right-0 md:right-10 lg:right-0 w-auto h-[1000px] md:h-[1200px] max-h-none object-contain object-right-bottom drop-shadow-2xl"
            />
          </div>
          
        </div>
      </div>

      <div ref={darkSectionRef} className="bg-[#005840] text-white py-24 md:py-32 md:rounded-t-[5rem] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">The future of Samsung Health.</h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">Zenith doesn't just track your metrics. It uses behavioral psychology and ecosystem automation to actively optimize your physiology.</p>
          </div>
          
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#D1F843] flex items-center justify-center mb-8">
                <span className="text-3xl">🌙</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Circadian Sync</h3>
              <p className="text-white/70 leading-relaxed font-medium">Align your habits with natural physiological rhythms. Validated automatically via Galaxy Ring sleep staging.</p>
            </div>
            
            <div className="feature-card bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#41D58C] flex items-center justify-center mb-8">
                <span className="text-3xl text-black">🔗</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">SmartThings Logic</h3>
              <p className="text-white/70 leading-relaxed font-medium">Automate your environment. Zenith adjusts your room temperature and lighting based on real-time recovery metrics.</p>
            </div>
            
            <div className="feature-card bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-8">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Predictive Intel</h3>
              <p className="text-white/70 leading-relaxed font-medium">Don't just track data. Execute behavioral protocols generated dynamically to optimize your daily physiological output.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="circle-reveal-container h-screen w-full relative bg-[#005840] z-40 overflow-hidden">
        <div className="circle-reveal-section absolute inset-0 bg-white flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-[#005840] text-6xl md:text-8xl lg:text-[7rem] font-display font-bold tracking-tighter mb-8 leading-none">
            Ready to <br/><span className="text-[#005840]">optimize?</span>
          </h2>
          <Link 
            href="/login"
            className="inline-flex items-center justify-center bg-[#005840] text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-black transition-all hover:scale-105"
          >
            Enter Zenith
          </Link>
        </div>
      </div>
      
    </main>
  );
}
