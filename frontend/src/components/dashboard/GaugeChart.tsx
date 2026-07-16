import React from 'react';

export default function GaugeChart({ activeTab }: { activeTab: string }) {
  const rotation = activeTab === 'Energy' ? 'rotate-[35deg]' : activeTab === 'Vitals' ? 'rotate-[65deg]' : 'rotate-[85deg]';
  const fillRotation = activeTab === 'Energy' ? 'rotate-[45deg]' : activeTab === 'Vitals' ? 'rotate-[75deg]' : 'rotate-[95deg]';

  return (
    <div className="lg:col-span-4 flex items-center justify-center relative min-h-[300px]">
       <div className="relative w-64 h-32 overflow-hidden">
          <div className={`absolute top-0 left-0 w-64 h-64 rounded-full border-[40px] ${activeTab === 'Insights' ? 'border-white/20' : 'border-black/10'} border-b-transparent border-r-transparent transform -rotate-45 transition-colors duration-700`}></div>
          <div className={`absolute top-0 left-0 w-64 h-64 rounded-full border-[40px] ${activeTab === 'Insights' ? 'border-[#D1F843]' : 'border-[#005840]'} border-b-transparent border-r-transparent transform ${fillRotation} transition-all duration-1000 ease-out`}></div>
          
          <div className={`absolute bottom-0 left-1/2 w-4 h-24 ${activeTab === 'Insights' ? 'bg-white' : 'bg-black'} origin-bottom transform -translate-x-1/2 ${rotation} rounded-t-full shadow-md z-10 transition-all duration-1000 ease-out`}></div>
          <div className={`absolute bottom-[-8px] left-1/2 w-6 h-6 ${activeTab === 'Insights' ? 'bg-white' : 'bg-black'} rounded-full transform -translate-x-1/2 z-20 transition-colors duration-700`}></div>
       </div>
       
       <svg className={`absolute -bottom-10 -right-10 w-96 h-96 pointer-events-none transition-all duration-1000 ease-in-out ${activeTab === 'Vitals' ? 'opacity-40 scale-110' : 'opacity-20 scale-100'}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke={activeTab === 'Insights' ? '#000000' : '#ffffff'} strokeWidth="8" d="M 0,100 C 50,150 150,50 200,100" />
       </svg>
    </div>
  );
}
