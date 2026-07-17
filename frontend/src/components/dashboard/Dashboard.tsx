"use client"
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DashboardHeader from './DashboardHeader';
import ScoreSection from './ScoreSection';
import GaugeChart from './GaugeChart';
import MetricsGrid from './MetricsGrid';
import AICoachSection from './AICoachSection';
import WeeklyAnalysis from './WeeklyAnalysis';
import ZenithChatbot from './ZenithChatbot';

gsap.registerPlugin(ScrollTrigger);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Energy');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const aiCoachRef = useRef<HTMLDivElement>(null);
  const weeklyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    const tl = gsap.timeline({ delay: 0.4 }); // Wait for the green overlay to start pulling away

    // 1. Header
    tl.fromTo(headerRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    // 2. Main Metric Grid (stagger the 3 panels)
    if (gridRef.current) {
      tl.fromTo(gridRef.current.children, 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 
        "-=0.6"
      );
    }

    // 3. AI Coach (Scroll-triggered)
    gsap.fromTo(aiCoachRef.current, 
      { y: 80, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aiCoachRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 4. Weekly Analysis (Scroll-triggered)
    gsap.fromTo(weeklyRef.current, 
      { y: 80, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: weeklyRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const getBgColor = () => {
    if (activeTab === 'Energy') return 'bg-[#41D58C]';
    if (activeTab === 'Vitals') return 'bg-[#D1F843]';
    if (activeTab === 'Insights') return 'bg-[#005840]';
    return 'bg-[#41D58C]';
  };

  return (
    <main className="min-h-screen bg-[#000000] font-sans selection:bg-[#D1F843] selection:text-black relative">
      
      {/* Seamless Transition Overlay from Login */}
      <div 
        className={`fixed inset-0 bg-[#005840] z-50 origin-top transition-transform duration-[1200ms] ease-in-out pointer-events-none ${isLoaded ? 'scale-y-0' : 'scale-y-100'}`}
      ></div>

      <section className={`${getBgColor()} rounded-b-[3rem] px-8 py-10 md:px-16 md:py-12 relative overflow-hidden transition-colors duration-700 ease-in-out`}>
        <div ref={headerRef} className="opacity-0">
          <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 mt-8">
          <ScoreSection activeTab={activeTab} />
          <GaugeChart activeTab={activeTab} />
          <MetricsGrid activeTab={activeTab} />
        </div>
      </section>
      
      <div ref={aiCoachRef} className="opacity-0 mt-8">
        <AICoachSection activeTab={activeTab} />
      </div>
      <div ref={weeklyRef} className="opacity-0">
        <WeeklyAnalysis />
      </div>
      <ZenithChatbot />
    </main>
  );
}
