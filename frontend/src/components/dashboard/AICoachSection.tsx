"use client"
import React, { useState } from 'react';
import weeklyData from '../../data/dashboard_data_weekly.json';

export default function AICoachSection({ activeTab }: { activeTab: string }) {
  const [questAccepted, setQuestAccepted] = useState(false);

  const content = {
    Energy: { title: "Sleep & Stress Insight", text: weeklyData.coaching_messages[1] },
    Vitals: { title: "Weekly Consistency", text: weeklyData.coaching_messages[2] },
    Insights: { title: "Activity Milestone", text: weeklyData.coaching_messages[0] }
  };

  const currentContent = content[activeTab as keyof typeof content] || content.Energy;

  return (
    <section className="px-8 py-16 md:px-16 text-white max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <h2 className="font-display text-4xl font-bold">Zenith Intelligence</h2>
        <span className="text-gray-400 font-semibold cursor-pointer hover:text-[#D1F843] transition-colors flex items-center gap-2">
          Sync Galaxy Health 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1A1A1A] rounded-[2rem] p-8 border border-gray-800 hover:border-[#D1F843] transition-colors group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-6 group-hover:bg-[#D1F843] group-hover:rotate-12 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 className="font-display text-2xl font-bold mb-4">{currentContent.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed min-h-[60px]">
            {currentContent.text}
          </p>
        </div>

        <div className={`rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-500 ${questAccepted ? 'bg-[#005840] text-white' : 'bg-[#D1F843] text-black hover:-translate-y-2'}`}>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-2xl font-bold">Behavioral Protocol</h3>
              <span className={`${questAccepted ? 'bg-white text-black' : 'bg-black text-white'} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors`}>
                {questAccepted ? 'Active' : 'Protocol'}
              </span>
            </div>
            <p className={`font-medium text-sm leading-relaxed mb-6 ${questAccepted ? 'text-white/90' : 'text-black/80'}`}>
              You've been sitting for a few hours this afternoon. Taking a quick 5-minute stretching break right now can help lower your stress and keep you energized!
            </p>
          </div>

        </div>

        <div className="bg-[#005840] rounded-[2rem] p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-bold mb-4">Verified Baseline</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              WHO guidelines suggest 150 active minutes per week. You reached {weeklyData.metrics.total_active_minutes} minutes this week! You crushed your weekly goal.
            </p>
          </div>
          <svg className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 group-hover:scale-110 group-hover:text-white/20 transition-all duration-500 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
