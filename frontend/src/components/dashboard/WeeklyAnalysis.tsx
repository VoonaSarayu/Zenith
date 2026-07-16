import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, ComposedChart } from 'recharts';
import weeklyData from '../../data/dashboard_data_weekly.json';

export default function WeeklyAnalysis() {
  const data = weeklyData.weekly_logs;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111] border border-white/20 p-4 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-white font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color || '#fff' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || '#fff' }}></span>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="px-8 py-16 md:px-16 max-w-[1400px] mx-auto text-white">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Historical Data Analysis</h2>
        <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Advanced physiological metrics plotted over a 7-day period natively. These models identify micro-trends in your recovery architecture to generate predictive protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Sleep Architecture (Stacked Area) */}
        <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-6 col-span-1 md:col-span-2 hover:border-[#D1F843]/50 transition-colors duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white/90">Sleep Architecture</h3>
            <span className="text-xs font-bold bg-[#1428A0]/20 text-[#1428A0] px-3 py-1 rounded-full uppercase">Quality</span>
          </div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#41D58C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#41D58C" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDeep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1428A0" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1428A0" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="day" stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sleep_hours" name="Total Sleep (h)" stroke="#41D58C" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" />
                <Area type="monotone" dataKey="deep_sleep_hours" name="Deep Sleep (h)" stroke="#1428A0" strokeWidth={3} fillOpacity={1} fill="url(#colorDeep)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stress Distribution */}
        <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-6 hover:border-[#D1F843]/50 transition-colors duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white/90">Stress Load</h3>
            <span className="text-xs font-bold bg-red-500/20 text-red-400 px-3 py-1 rounded-full uppercase">Cortisol</span>
          </div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="day" stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="stress_score" name="Stress Score" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kinetic Activity (Steps) */}
        <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-6 hover:border-[#D1F843]/50 transition-colors duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white/90">Kinetic Output</h3>
            <span className="text-xs font-bold bg-[#D1F843]/20 text-[#D1F843] px-3 py-1 rounded-full uppercase">Steps</span>
          </div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="day" stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff10' }} />
                <Bar dataKey="steps" name="Steps" fill="#D1F843" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HRV vs RHR */}
        <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-6 col-span-1 md:col-span-2 hover:border-[#D1F843]/50 transition-colors duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white/90">Cardiovascular Recovery (HRV vs RHR)</h3>
            <span className="text-xs font-bold bg-white/10 text-white/70 px-3 py-1 rounded-full uppercase">Vitals</span>
          </div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="day" stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line yAxisId="left" type="monotone" dataKey="hrv_ms" name="HRV (ms)" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} />
                <Line yAxisId="right" type="monotone" dataKey="resting_heart_rate" name="RHR (bpm)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
