import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { ArrowLeft, Sparkles, BookOpen, Target, CheckCircle2, AlertCircle, Lightbulb, Bookmark } from 'lucide-react';

interface Props {
  article: Article;
  onBack: () => void;
  onMarkComplete: (id: string) => void;
}

export default function ArticleDetail({ article, onBack, onMarkComplete }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const bookmarks = JSON.parse(localStorage.getItem('mentor_bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(article.id));
  }, [article.id]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('mentor_bookmarks') || '[]');
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((id: string) => id !== article.id);
    } else {
      newBookmarks = [...bookmarks, article.id];
    }
    localStorage.setItem('mentor_bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-full transition-colors border border-slate-800 shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest text-center flex-1">
          Daily Mentor
        </div>
        <button 
          onClick={toggleBookmark}
          className={`p-2 rounded-full transition-colors border shrink-0 ${isBookmarked ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* Title Hero */}
        <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900/50">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {article.keywords.map(kw => (
              <span key={kw} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-10">
          {/* Simple Explanation */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-widest">Mentor's Explanation</h2>
            </div>
            <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-2xl p-6 text-indigo-100 text-base leading-relaxed">
              {article.simpleExplanation}
            </div>
          </section>

          {/* Relevance */}
          <section>
             <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-orange-400" />
              <h2 className="text-sm font-semibold text-orange-400 uppercase tracking-widest">Why It Matters</h2>
            </div>
            <div className="bg-orange-950/20 border border-orange-900/30 rounded-2xl p-6 text-orange-100 text-base leading-relaxed border-l-4 border-l-orange-500">
              {article.relevanceInfo}
            </div>
          </section>

          {/* Related Issues */}
          {article.relatedIssues && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-widest">Current Related Issues</h2>
              </div>
              <div className="bg-rose-950/20 border border-rose-900/30 rounded-2xl p-6 text-rose-100 text-base leading-relaxed border-l-4 border-l-rose-500">
                {article.relatedIssues}
              </div>
            </section>
          )}

          {/* Examples */}
          {article.examples && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-widest">Real-World Examples</h2>
              </div>
              <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-6 text-amber-100 text-base leading-relaxed border-l-4 border-l-amber-500">
                {article.examples}
              </div>
            </section>
          )}

           {/* Original Summary */}
           <section>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Original Summary</h2>
            </div>
            <div className="text-slate-300 text-base leading-relaxed prose prose-invert">
              {article.aiSummary}
            </div>
          </section>
        </div>
      </main>

      {/* Floating Action */}
      <div className="fixed bottom-6 left-0 right-0 px-6 max-w-2xl mx-auto z-20">
        <button 
          onClick={() => {
            onMarkComplete(article.id);
            onBack();
          }}
          className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-2xl transition-all ${
            article.isCompleted 
              ? 'bg-slate-800 text-slate-400 border border-slate-700' 
              : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20 hover:shadow-emerald-500/40'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" /> 
          {article.isCompleted ? 'Completed' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
}
