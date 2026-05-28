import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Calendar as CalendarIcon } from 'lucide-react';

interface Props {
  streak: number;
  todayCompleted: boolean;
}

export default function ProgressReport({ streak, todayCompleted }: Props) {
  // Generate a mock 7-day history based on the current streak
  // This is a simple visual approximation since we don't store daily timestamps yet.
  const data = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const result = [];
    
    let currentStreak = streak;
    if (!todayCompleted && currentStreak > 0) {
      // If today is not completed but we have a streak, the streak is up to yesterday
    }

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const isToday = i === 0;
      
      let completed = 0;
      
      if (isToday) {
        completed = todayCompleted ? 1 : 0;
      } else {
        // Simple logic to fill previous days based on streak
        const daysAgo = i;
        if (todayCompleted) {
           completed = daysAgo < currentStreak ? 1 : 0;
        } else {
           completed = daysAgo <= currentStreak ? 1 : 0;
        }
      }

      result.push({
        name: days[d.getDay()],
        completed: completed,
        isToday
      });
    }
    return result;
  }, [streak, todayCompleted]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl">
          <p className="text-sm font-semibold text-white">{data.name}</p>
          <p className="text-xs text-slate-400 mt-1">
            {data.completed ? '1 Article Completed' : 'Missed'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Weekly Consistency</h2>
          <p className="text-xs text-slate-500 mt-1">Your reading habits over the last 7 days</p>
        </div>
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
        </div>
      </div>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              hide={true} 
              domain={[0, 1]} 
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
            />
            <Bar dataKey="completed" radius={[4, 4, 4, 4]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.completed ? (entry.isToday ? '#10b981' : '#34d399') : '#1e293b'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
