"use client"
import React, { useEffect, useState } from 'react';
import weeklyData from '../../data/dashboard_data_weekly.json';

export default function ScoreSection({ activeTab }: { activeTab: string }) {
  const [score, setScore] = useState(0);
  const metrics = weeklyData.metrics;
  
  const targetScore = activeTab === 'Energy' 
    ? Math.round(metrics.avg_wellness_score) 
    : activeTab === 'Vitals' 
      ? Math.round(metrics.avg_resting_heart_rate) 
      : Math.round(metrics.avg_stress);

  const subtitle = activeTab === 'Energy' ? 'Overall Wellness' : activeTab === 'Vitals' ? 'Resting Heart Rate' : 'Average Stress';
  const detail = activeTab === 'Energy' ? 'Good balance of sleep, activity, and recovery.' : activeTab === 'Vitals' ? 'Your heart rate is healthy and stable.' : 'Stress levels are within a moderate, healthy range.';
  const unit = activeTab === 'Energy' ? '' : activeTab === 'Vitals' ? 'bpm' : '/ 100';

  useEffect(() => {
    setScore(0);
    const interval = setInterval(() => {
      setScore(prev => {
        if (prev < targetScore) return prev + 1;
        clearInterval(interval);
        return targetScore;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [targetScore]);

  return (
    <div className={`lg:col-span-4 flex flex-col justify-center transition-colors duration-700 ${activeTab === 'Insights' ? 'text-white' : 'text-black'}`}>
      <div className="mb-3 text-xs font-bold uppercase tracking-widest opacity-60">Weekly Average</div>
      <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
        {subtitle}
      </h1>
      <div className="mb-2 text-sm font-bold opacity-80 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Based on Samsung Health Data
      </div>
      <div className="font-display text-7xl md:text-8xl font-black tracking-tighter leading-none mb-4 tabular-nums flex items-baseline">
        {score} <span className="text-2xl ml-2 opacity-50">{unit}</span>
      </div>
      <div className="font-medium text-sm max-w-[240px] opacity-70 h-10 leading-relaxed">
        {detail}
      </div>
      
      <div className={`mt-8 rounded-3xl p-5 inline-block w-max transition-colors duration-700 ${activeTab === 'Insights' ? 'bg-white/10 backdrop-blur-md' : 'bg-black/5'}`}>
        <div className={`font-semibold text-xs mb-1 uppercase tracking-wider ${activeTab === 'Insights' ? 'text-gray-300' : 'text-gray-500'}`}>Weekly Target</div>
        <div className="font-display text-2xl font-bold flex items-center gap-2">
          {activeTab === 'Energy' ? '80' : activeTab === 'Vitals' ? '60-70' : '< 50'} <span className="text-xs font-medium mt-1 opacity-50">Target Range</span>
        </div>
      </div>
    </div>
  );
}
