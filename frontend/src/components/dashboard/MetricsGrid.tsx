import React from 'react';

export default function MetricsGrid({ activeTab }: { activeTab: string }) {
  
  const metrics = {
    Aura: [
      { id: 1, title: 'Deep Sleep', value: '2.4', unit: 'h', icon: '🌙', color: 'bg-blue-100', text: 'text-blue-600', status: 'Optimal' },
      { id: 2, title: 'HRV Baseline', value: '64', unit: 'ms', icon: '❤️', color: 'bg-green-100', text: 'text-green-600', status: 'Stable' },
      { id: 3, title: 'Stress Impact', value: 'Low', unit: '', icon: '🧘', color: 'bg-purple-100', text: 'text-purple-600', status: 'In Control', fullW: true, desc: 'Cortisol levels peaked briefly at 9AM but stabilized effectively.' }
    ],
    Metrics: [
      { id: 1, title: 'Blood Oxygen', value: '99', unit: '%', icon: '🩸', color: 'bg-red-100', text: 'text-red-600', status: 'Perfect' },
      { id: 2, title: 'VO2 Max', value: '48', unit: '', icon: '🏃', color: 'bg-orange-100', text: 'text-orange-600', status: 'Elite' },
      { id: 3, title: 'Skin Temp', value: '-0.2', unit: '°C', icon: '🌡️', color: 'bg-teal-100', text: 'text-teal-600', status: 'Baseline', fullW: true, desc: 'Overnight body temperature aligned flawlessly with circadian rhythms.' }
    ],
    Coach: [
      { id: 1, title: 'Active Minutes', value: '112', unit: 'm', icon: '⏱️', color: 'bg-gray-100', text: 'text-gray-800', status: 'On Track' },
      { id: 2, title: 'Hydration', value: '1.2', unit: 'L', icon: '💧', color: 'bg-cyan-100', text: 'text-cyan-600', status: 'Below Avg' },
      { id: 3, title: 'Recovery Debt', value: 'Zero', unit: '', icon: '🔋', color: 'bg-lime-100', text: 'text-lime-700', status: 'Charged', fullW: true, desc: 'You have absolutely zero sleep debt carrying over from yesterday.' }
    ]
  };

  const activeData = metrics[activeTab as keyof typeof metrics];

  return (
    <div className="lg:col-span-4 grid grid-cols-2 gap-4">
      {activeData.map((item, index) => (
        <div key={item.id} className={`bg-white rounded-3xl p-6 shadow-lg hover:-translate-y-1 transition-transform duration-300 ${item.fullW ? 'col-span-2' : 'col-span-2 md:col-span-1'} animate-in fade-in slide-in-from-bottom-4`} style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}>
          {item.fullW ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className={`text-xs font-bold ${item.text} ${item.color} px-3 py-1.5 rounded-full`}>{item.status}</div>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{item.desc}</p>
              <div className="text-4xl font-display font-bold">{item.value}<span className="text-xl text-gray-400 ml-1">{item.unit}</span></div>
            </>
          ) : (
            <>
              <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-6`}>
                <span className="text-xl">{item.icon}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-6">{item.title}</h3>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-display font-bold">{item.value}<span className="text-lg text-gray-400">{item.unit}</span></div>
                <div className={`text-xs font-bold ${item.text} ${item.color} px-2 py-1 rounded-full`}>{item.status}</div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
