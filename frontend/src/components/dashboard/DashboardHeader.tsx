import React from 'react';

export default function DashboardHeader({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  
  const getLogoColor = () => {
    if (activeTab === 'Insights') return 'text-white';
    return 'text-[#005840]';
  };

  const getDividerColor = () => {
    if (activeTab === 'Insights') return 'bg-white/20';
    return 'bg-[#1428A0]/20';
  };

  return (
    <header className="flex justify-between items-center mb-16 relative z-10 w-full">
      <div className="flex items-center">
        <img src="/samsung-logo-blue.png" alt="Samsung" className={`h-4 md:h-10 object-contain transition-all ${activeTab === 'Insights' ? 'brightness-0 invert' : ''}`} />
        <div className={`h-4 md:h-5 w-px mx-4 md:mx-5 transition-colors duration-700 ${getDividerColor()}`}></div>
        <span className={`font-logo font-medium text-3xl md:text-4xl tracking-wide mt-1 transition-colors duration-700 ${getLogoColor()}`}>
          Zenith
        </span>
      </div>
      
      {/* Middle: Navigation Buttons (Short Rounded Underline) */}
      <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2 z-50">
        <button 
          onClick={() => setActiveTab('Energy')}
          className={`relative pb-2 font-bold text-sm transition-all duration-300 ${activeTab === 'Energy' ? (activeTab === 'Insights' ? 'text-white' : 'text-black') : (activeTab === 'Insights' ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black')}`}
        >
          Energy Score
          {activeTab === 'Energy' && (
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] w-5 rounded-full ${activeTab === 'Insights' ? 'bg-white' : 'bg-black'}`}></div>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('Vitals')}
          className={`relative pb-2 font-bold text-sm transition-all duration-300 ${activeTab === 'Vitals' ? (activeTab === 'Insights' ? 'text-white' : 'text-black') : (activeTab === 'Insights' ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black')}`}
        >
          Clinical Vitals
          {activeTab === 'Vitals' && (
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] w-5 rounded-full ${activeTab === 'Insights' ? 'bg-white' : 'bg-black'}`}></div>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('Insights')}
          className={`relative pb-2 font-bold text-sm transition-all duration-300 ${activeTab === 'Insights' ? (activeTab === 'Insights' ? 'text-white' : 'text-black') : (activeTab === 'Insights' ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black')}`}
        >
          Predictive Insights
          {activeTab === 'Insights' && (
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] w-5 rounded-full ${activeTab === 'Insights' ? 'bg-white' : 'bg-black'}`}></div>
          )}
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
