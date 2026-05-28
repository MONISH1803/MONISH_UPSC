import React, { useState, useEffect } from 'react';
import { UserPreferences, Article } from '../types';
import { mockArticles } from '../data/mockArticles';
import { Settings, CheckCircle2, Circle, ArrowRight, Flame, Map, Trophy, Calendar, BookOpen, Bookmark, BarChart2 } from 'lucide-react';
import ProgressReport from './ProgressReport';

interface Props {
  prefs: UserPreferences;
  onOpenSettings: () => void;
  onOpenArticle: (article: Article) => void;
  onOpenTimeline: () => void;
}

export default function Dashboard({ prefs, onOpenSettings, onOpenArticle, onOpenTimeline }: Props) {
  const [completedCount, setCompletedCount] = useState(0);
  const [streak, setStreak] = useState(1);
  const [todayState, setTodayState] = useState<'pending' | 'completed' | 'all_done'>('pending');
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState<'daily' | 'bookmarks'>('daily');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    const savedStates = JSON.parse(localStorage.getItem('mentor_articles_state') || '{}');
    const savedBookmarks = JSON.parse(localStorage.getItem('mentor_bookmarks') || '[]');
    setBookmarkedIds(savedBookmarks);
    const lastCompletedDate = localStorage.getItem('mentor_last_completed_date');
    const today = new Date().toDateString();

    let count = 0;
    let nextUncompleted: Article | null = null;

    mockArticles.forEach(a => {
      if (savedStates[a.id]) {
        count++;
      } else if (!nextUncompleted) {
        nextUncompleted = a;
      }
    });

    setCompletedCount(count);

    if (!nextUncompleted) {
      setTodayState('all_done');
    } else if (lastCompletedDate === today) {
      setTodayState('completed');
    } else {
      setTodayState('pending');
      setCurrentArticle({ ...nextUncompleted, isCompleted: false });
    }
    
    // Check streak
    const lastStreak = parseInt(localStorage.getItem('mentor_streak') || '1');
    setStreak(lastStreak);
  }, [prefs]);

  const progressPercent = mockArticles.length > 0 ? (completedCount / mockArticles.length) * 100 : 0;
  const bookmarkedArticles = mockArticles.filter(a => bookmarkedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-white tracking-tight">Daily Mentor</h1>
          <p className="text-xs text-slate-400 capitalize">{prefs.examType} Track</p>
        </div>
        <button onClick={onOpenSettings} className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-full transition-colors border border-slate-800">
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Progress Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex justify-between items-end mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Total Progress</p>
              <div className="text-3xl font-bold text-white tracking-tight">
                {completedCount} <span className="text-slate-500 text-xl font-normal">/ {mockArticles.length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-orange-500/10 text-orange-400 px-3 py-1.5 rounded-lg border border-orange-500/20">
              <Flame className="w-4 h-4 fill-orange-400" />
              <span className="font-semibold text-sm">{streak} Day Streak</span>
            </div>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden relative z-10 mb-6">
            <div 
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-700 ease-out" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <button 
             onClick={onOpenTimeline}
             className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors font-medium text-sm border border-slate-700 hover:border-slate-600 relative z-10"
          >
             <Map className="w-4 h-4 text-emerald-400" /> View Full Study Timeline
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
           <button 
             onClick={() => setActiveTab('daily')}
             className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'daily' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
           >
             Daily Focus
           </button>
           <button 
             onClick={() => setActiveTab('bookmarks')}
             className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'bookmarks' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
           >
             <Bookmark className={`w-4 h-4 ${activeTab === 'bookmarks' ? 'fill-current' : ''}`} />
             Saved ({bookmarkedIds.length})
           </button>
        </div>

        {activeTab === 'daily' ? (
          /* Today's Article Section */
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Today's Focus</h2>
            <div className="space-y-4">
              
              {todayState === 'all_done' && (
                 <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-8 text-center">
                    <Trophy className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Incredible Journey!</h3>
                    <p className="text-slate-300">You've completed all the scheduled articles for this track. Check the timeline to review your progress.</p>
                 </div>
              )}

              {todayState === 'completed' && (
                 <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-2xl p-8 text-center">
                    <CheckCircle2 className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">You're done for today!</h3>
                    <p className="text-slate-300">Great job keeping up the habit. We'll have your next article ready tomorrow.</p>
                    <p className="text-xs text-indigo-300/70 mt-4"><Calendar className="w-3 h-3 inline-block" /> Queued to roll over at midnight</p>
                 </div>
              )}

              {todayState === 'pending' && currentArticle && (
                <div 
                  onClick={() => onOpenArticle(currentArticle)}
                  className="group flex flex-col p-6 rounded-2xl border transition-all cursor-pointer bg-slate-900 border-slate-700 hover:border-emerald-500/50 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <BookOpen className="w-24 h-24 text-white -mt-8 -mr-8" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors pr-8 leading-snug">
                      {currentArticle.title}
                    </h3>
                    <button className="flex-shrink-0 mt-1">
                       <Circle className="w-6 h-6 text-emerald-500 group-hover:text-emerald-400" />
                    </button>
                  </div>
                  
                  <p className="text-base text-slate-300 line-clamp-3 mb-6 relative z-10 leading-relaxed">
                    {currentArticle.simpleExplanation}
                  </p>

                  <div className="mt-auto flex items-center justify-between relative z-10 pt-4 border-t border-slate-800">
                    <div className="flex gap-2 text-xs font-mono">
                      <span className="px-2 py-1 bg-slate-800 rounded text-slate-300 border border-slate-700">{currentArticle.keywords[0]}</span>
                      {currentArticle.keywords.length > 1 && (
                        <span className="px-2 py-1 bg-slate-800 rounded text-slate-300 border border-slate-700">+{currentArticle.keywords.length - 1}</span>
                      )}
                    </div>
                    <span className="flex items-center text-sm font-semibold text-emerald-400 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
                      Start Learning <ArrowRight className="w-4 h-4 ml-1.5" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <ProgressReport streak={streak} todayCompleted={todayState === 'completed'} />
          </div>
        ) : (
          /* Bookmarks Section */
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Saved Articles</h2>
            {bookmarkedArticles.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/50 border border-slate-800/50 rounded-2xl">
                 <Bookmark className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                 <p className="text-slate-400">No saved articles yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookmarkedArticles.map(article => (
                   <div 
                      key={article.id}
                      onClick={() => onOpenArticle(article)}
                      className="p-5 bg-slate-900 rounded-2xl border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition-colors flex flex-col gap-3"
                   >
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-emerald-400 transition-colors">{article.title}</h3>
                        <Bookmark className="w-5 h-5 text-emerald-400 fill-current shrink-0" />
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{article.simpleExplanation}</p>
                   </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
