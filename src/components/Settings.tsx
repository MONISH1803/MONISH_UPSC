import React from 'react';
import { UserPreferences } from '../types';
import { ArrowLeft, Trash2, BellRing } from 'lucide-react';
import { mockArticles } from '../data/mockArticles';

interface Props {
  prefs: UserPreferences;
  onBack: () => void;
  onReset: () => void;
}

export default function Settings({ prefs, onBack, onReset }: Props) {
  const testNotification = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications');
      return;
    }

    let permission = Notification.permission;
    if (permission !== 'granted') {
      permission = await Notification.requestPermission();
    }

    if (permission === 'granted') {
      const savedStates = JSON.parse(localStorage.getItem('mentor_articles_state') || '{}');
      const todayArticle = mockArticles.find(a => !savedStates[a.id]);
      const title = todayArticle ? todayArticle.title : "All caught up!";

      new Notification("📚 Daily Article Mentor Test", {
        body: `Your notification system is working! Next article: ${title}`
      });
    } else {
      alert('Notification permissions are denied. Please enable them in your browser settings.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <header className="border-b border-slate-800 px-4 py-4 flex items-center gap-4 bg-slate-900">
        <button 
          onClick={onBack}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors border border-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-white">Settings</span>
      </header>

      <div className="max-w-2xl mx-auto p-6 mt-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <span className="text-slate-400 text-sm">Target Exam</span>
            <span className="text-white font-medium">{prefs.examType}</span>
          </div>
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <span className="text-slate-400 text-sm">Pacing</span>
            <span className="text-white font-medium">1 Article / day</span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-slate-400 text-sm">Notification Time</span>
            <span className="text-white font-medium">
              {(() => {
                const [hr, min] = prefs.notificationTime.split(':');
                const hour = parseInt(hr, 10);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour % 12 || 12;
                return `${hour12.toString().padStart(2, '0')}:${min} ${ampm}`;
              })()}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={testNotification}
            className="w-full py-4 text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors border border-emerald-500/20"
          >
            <BellRing className="w-5 h-5" /> Send Test Web Notification Now
          </button>

          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to completely reset your progress and preferences?')) {
                onReset();
              }
            }}
            className="w-full py-4 text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors border border-red-500/20"
          >
            <Trash2 className="w-5 h-5" /> Reset App Data
          </button>
        </div>
      </div>
    </div>
  );
}
