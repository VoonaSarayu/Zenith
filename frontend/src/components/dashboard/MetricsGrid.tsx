import React from 'react';
import weeklyData from '../../data/dashboard_data_weekly.json';

export default function MetricsGrid({ activeTab }: { activeTab: string }) {
  const metrics = weeklyData.metrics;
  const logs = weeklyData.weekly_logs;
  
  const avgDeepSleep = (logs.reduce((acc, curr) => acc + curr.deep_sleep_hours, 0) / 7).toFixed(1);
  const avgHrv = Math.round(logs.reduce((acc, curr) => acc + curr.hrv_ms, 0) / 7);

  const gridData = {
    Energy: [
      { id: 1, title: 'Average Sleep', value: metrics.avg_sleep.toFixed(1), unit: 'h', icon: '🌙', color: 'bg-blue-100', text: 'text-blue-600', status: 'Good' },
      { id: 2, title: 'Deep Sleep', value: avgDeepSleep, unit: 'h', icon: '💤', color: 'bg-indigo-100', text: 'text-indigo-600', status: 'Stable' },
      { id: 3, title: 'Stress Level', value: Math.round(metrics.avg_stress), unit: '/ 100', icon: '🧘', color: 'bg-purple-100', text: 'text-purple-600', status: 'Moderate', fullW: true, desc: `Your average stress this week. It peaked at ${metrics.highest_stress_day.score} on Tuesday.` }
    ],
    Vitals: [
      { id: 1, title: 'Resting Heart Rate', value: Math.round(metrics.avg_resting_heart_rate), unit: 'bpm', icon: '❤️', color: 'bg-red-100', text: 'text-red-600', status: 'Healthy' },
      { id: 2, title: 'Heart Rate Variability', value: avgHrv, unit: 'ms', icon: '💓', color: 'bg-pink-100', text: 'text-pink-600', status: 'Normal' },
      { id: 3, title: 'Overall Wellness', value: Math.round(metrics.avg_wellness_score), unit: '/ 100', icon: '🔋', color: 'bg-teal-100', text: 'text-teal-600', status: 'Good', fullW: true, desc: 'Your overall body readiness score based on sleep, activity, and heart rate.' }
    ],
    Insights: [
      { id: 1, title: 'Daily Steps', value: Math.round(metrics.avg_steps).toLocaleString(), unit: '', icon: '👟', color: 'bg-green-100', text: 'text-green-600', status: 'Great' },
      { id: 2, title: 'Active Minutes', value: metrics.total_active_minutes, unit: 'm', icon: '🏃', color: 'bg-orange-100', text: 'text-orange-600', status: 'Goal Met' },
      { id: 3, title: 'Activity Summary', value: 'Active', unit: '', icon: '🔥', color: 'bg-yellow-100', text: 'text-yellow-700', status: 'Consistent', fullW: true, desc: `You exceeded the recommended 150 active minutes by reaching ${metrics.total_active_minutes} minutes this week!` }
    ]
  };

  const activeData = gridData[activeTab as keyof typeof gridData] || gridData.Energy;

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
