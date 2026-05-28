import React, { useEffect, useState } from 'react';
import { UserPreferences, Article } from '../types';
import { ArrowLeft, CheckCircle2, Circle, Map } from 'lucide-react';
import { mockArticles } from '../data/mockArticles';

interface Props {
  prefs: UserPreferences;
  onBack: () => void;
  onOpenArticle: (article: Article) => void;
}

export default function TimelineView({ prefs, onBack, onOpenArticle }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const savedStates = JSON.parse(localStorage.getItem('mentor_articles_state') || '{}');
    const loadedArticles = mockArticles.map(a => ({
      ...a,
      isCompleted: savedStates[a.id] || false
    }));
    setArticles(loadedArticles);
  }, []);

  const days = articles;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-24">
      <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-4 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-full transition-colors border border-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="font-semibold text-white flex items-center gap-2">
          <Map className="w-5 h-5 text-emerald-400" />
          Study Timeline
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Your Journey</h1>
          <p className="text-slate-400 text-sm">
            Mapping out your path covering the Constitution.
            <br />
            (1 article scheduled per day)
          </p>
        </div>

        <div className="relative border-l border-slate-800 ml-4 md:ml-0 md:border-l-0 mt-8">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2"></div>
          
          <div className="space-y-8">
            {days.map((article, dayIdx) => {
              const isCompleted = article.isCompleted;
              const isEven = dayIdx % 2 === 0;

              return (
                <div key={article.id} className={`relative flex items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-0 pl-8 md:pl-0`}>
                  
                  {/* Timeline Marker */}
                  <div className="absolute left-[-16px] md:relative md:left-auto md:w-1/2 flex justify-center md:items-center shrink-0">
                     <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-slate-950 shadow-sm ${isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'} md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <div className="font-bold text-xs">{dayIdx + 1}</div>}
                     </span>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2">
                    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors ${isEven ? 'md:mr-10' : 'md:ml-10'}`}>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/50">
                        <span className="font-semibold text-slate-200">Day {dayIdx + 1}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${isCompleted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                           {isCompleted ? 'Done' : 'Pending'}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                          <div 
                            onClick={() => onOpenArticle(article)}
                            className="group flex flex-col gap-1 cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1 shrink-0 text-slate-600 group-hover:text-emerald-400 transition-colors">
                                {article.isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                              </div>
                              <div>
                                <p className={`text-sm font-medium leading-snug transition-colors ${article.isCompleted ? 'text-slate-500 line-through' : 'text-slate-300 group-hover:text-emerald-400'}`}>
                                  {article.title}
                                </p>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
