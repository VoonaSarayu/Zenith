import React from 'react';

export default function DashboardHeader({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  
  const getLogoColor = () => {
    if (activeTab === 'Coach') return 'text-white';
    return 'text-[#005840]';
  };

  const getDividerColor = () => {
    if (activeTab === 'Coach') return 'bg-white/20';
    return 'bg-[#1428A0]/20';
  };

  return (
    <header className="flex justify-between items-center mb-16 relative z-10 w-full">
      <div className="flex items-center">
        <img src="/samsung-logo-blue.png" alt="Samsung" className={`h-4 md:h-10 object-contain transition-all ${activeTab === 'Coach' ? 'brightness-0 invert' : ''}`} />
        <div className={`h-6 w-px mx-4 md:mx-5 transition-colors duration-700 ${getDividerColor()}`}></div>
        <span className={`font-logo font-medium text-3xl md:text-4xl tracking-wide mt-1 transition-colors duration-700 ${getLogoColor()}`}>
          Zenith
        </span>
      </div>
      
      <div className="hidden md:flex gap-3 absolute left-1/2 transform -translate-x-1/2 bg-black/5 backdrop-blur-md p-1 rounded-full border border-black/10">
        <button 
          onClick={() => setActiveTab('Aura')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'Aura' ? 'bg-black text-white shadow-lg scale-105' : 'text-black hover:bg-white/50'}`}
        >
          Aura Score
        </button>
        <button 
          onClick={() => setActiveTab('Metrics')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'Metrics' ? 'bg-black text-white shadow-lg scale-105' : 'text-black hover:bg-white/50'}`}
        >
          Vital Metrics
        </button>
        <button 
          onClick={() => setActiveTab('Coach')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'Coach' ? 'bg-white text-black shadow-lg scale-105' : 'text-white md:text-black hover:bg-white/30'}`}
        >
          AI Coach
        </button>
      </div>

      <div className="bg-white rounded-full px-4 py-2 flex items-center gap-3 shadow-sm z-10 cursor-pointer hover:shadow-md transition-all">
        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" alt="Emily Park" />
        </div>
        <span className="font-semibold text-sm">Emily Park</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </header>
  );
}
