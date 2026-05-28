import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { ChevronRight, Target, Clock, BookOpen, Bell } from 'lucide-react';

interface Props {
  onComplete: (prefs: UserPreferences) => void;
}

export default function Onboarding({ onComplete }: Props) {
  const [examType, setExamType] = useState('UPSC');
  const [notificationTime, setNotificationTime] = useState('08:00');

  const exams = ['UPSC', 'SSC', 'TNPSC', 'Custom'];
  
  const handleComplete = () => {
    onComplete({
      examType,
      notificationTime,
      isOnboarded: true
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Daily Article Mentor</h1>
          <p className="text-slate-400 text-sm mt-2">Let's set up your personalized study plan.</p>
        </div>

        <div className="space-y-6">
          {/* Exam Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <BookOpen className="w-4 h-4 text-emerald-400" /> Target Exam
            </label>
            <div className="grid grid-cols-2 gap-3">
              {exams.map(exam => (
                <button
                  key={exam}
                  onClick={() => setExamType(exam)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    examType === exam 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>

          {/* Notification */}
          <div>
             <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <Bell className="w-4 h-4 text-emerald-400" /> Daily Notification Time
            </label>
            <input 
              type="time" 
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <button 
            onClick={handleComplete}
            className="w-full mt-4 bg-white text-slate-900 hover:bg-slate-100 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            Start Learning <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
