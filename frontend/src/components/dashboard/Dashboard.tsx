"use client"
import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import ScoreSection from './ScoreSection';
import GaugeChart from './GaugeChart';
import MetricsGrid from './MetricsGrid';
import AICoachSection from './AICoachSection';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Energy');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getBgColor = () => {
    if (activeTab === 'Energy') return 'bg-[#41D58C]';
    if (activeTab === 'Vitals') return 'bg-[#D1F843]';
    if (activeTab === 'Insights') return 'bg-[#005840]';
    return 'bg-[#41D58C]';
  };

  return (
    <main className="min-h-screen bg-[#000000] font-sans selection:bg-[#D1F843] selection:text-black">
      <section className={`${getBgColor()} rounded-b-[3rem] px-8 py-10 md:px-16 md:py-12 relative overflow-hidden transition-colors duration-700 ease-in-out`}>
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ScoreSection activeTab={activeTab} />
          <GaugeChart activeTab={activeTab} />
          <MetricsGrid activeTab={activeTab} />
        </div>
      </section>
      <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AICoachSection activeTab={activeTab} />
      </div>
    </main>
  );
}
