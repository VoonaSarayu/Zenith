"use client"
import React, { useEffect, useState } from 'react';

export default function ScoreSection({ activeTab }: { activeTab: string }) {
  const [score, setScore] = useState(0);
  
  const targetScore = activeTab === 'Aura' ? 85 : activeTab === 'Metrics' ? 92 : 98;
  const subtitle = activeTab === 'Aura' ? 'Energy Capacity' : activeTab === 'Metrics' ? 'Recovery Index' : 'Readiness Level';
  const detail = activeTab === 'Aura' ? 'Excellent. Synced via Galaxy Ring.' : activeTab === 'Metrics' ? 'HRV stabilized overnight.' : 'Prime state for intense physical strain.';

  useEffect(() => {
    setScore(0);
    const interval = setInterval(() => {
      setScore(prev => {
        if (prev < targetScore) return prev + 2;
        clearInterval(interval);
        return targetScore;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [targetScore]);

  return (
    <div className={`lg:col-span-4 flex flex-col justify-center transition-colors duration-700 ${activeTab === 'Coach' ? 'text-white' : 'text-black'}`}>
      <div className="mb-3 text-xs font-bold uppercase tracking-widest opacity-60">Current Status</div>
      <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
        {subtitle}
      </h1>
      <div className="mb-2 text-sm font-bold opacity-80 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Live Data Active
      </div>
      <div className="font-display text-7xl md:text-8xl font-black tracking-tighter leading-none mb-4 tabular-nums">
        {score}
      </div>
      <div className="font-medium text-sm max-w-[240px] opacity-70 h-10 leading-relaxed">
        {detail}
      </div>
      
      <div className={`mt-8 rounded-3xl p-5 inline-block w-max transition-colors duration-700 ${activeTab === 'Coach' ? 'bg-white/10 backdrop-blur-md' : 'bg-black/5'}`}>
        <div className={`font-semibold text-xs mb-1 uppercase tracking-wider ${activeTab === 'Coach' ? 'text-gray-300' : 'text-gray-500'}`}>Optimization Goal</div>
        <div className="font-display text-2xl font-bold flex items-center gap-2">
          {Math.floor(targetScore * 1.08)} <span className="text-xs font-medium mt-1 opacity-50">/ {targetScore + 15}</span>
        </div>
      </div>
    </div>
  );
}
