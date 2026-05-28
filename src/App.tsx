import React, { useState, useEffect, useRef } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ArticleDetail from './components/ArticleDetail';
import Settings from './components/Settings';
import TimelineView from './components/TimelineView';
import { UserPreferences, Article } from './types';
import { mockArticles } from './data/mockArticles';

export default function App() {
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);
  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard' | 'article' | 'settings' | 'timeline'>('onboarding');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mentor_prefs');
    if (saved) {
      const parsedPrefs = JSON.parse(saved);
      setPrefs(parsedPrefs);
      if (parsedPrefs.isOnboarded) {
        setCurrentView('dashboard');
      }
      
      // Request permission on load if they have onboarded
      if (parsedPrefs.isOnboarded && 'Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  // Web Notification Scheduler
  useEffect(() => {
    if (!prefs?.isOnboarded || !prefs.notificationTime) return;

    const checkTime = () => {
      const now = new Date();
      const currentHour = now.getHours().toString().padStart(2, '0');
      const currentMinute = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentHour}:${currentMinute}`;

      if (currentTime === prefs.notificationTime) {
        const lastFired = localStorage.getItem('lastNotificationDate');
        const today = now.toDateString();
        
        if (lastFired !== today) {
          if ('Notification' in window && Notification.permission === 'granted') {
            const savedStates = JSON.parse(localStorage.getItem('mentor_articles_state') || '{}');
            const todayArticle = mockArticles.find(a => !savedStates[a.id]);

            if (todayArticle) {
              const notification = new Notification("📚 Daily Article Mentor", {
                body: `It's time to study! Today: ${todayArticle.title}\nTap to open your daily guide.`
              });
              
              notification.onclick = () => {
                window.focus();
                setSelectedArticle(todayArticle);
                setCurrentView('article');
              };

              localStorage.setItem('lastNotificationDate', today);
            }
          }
        }
      }
    };

    // Check every 10 seconds
    intervalRef.current = window.setInterval(checkTime, 10000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [prefs]);

  const handleCompleteOnboarding = async (newPrefs: UserPreferences) => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
    
    setPrefs(newPrefs);
    localStorage.setItem('mentor_prefs', JSON.stringify(newPrefs));
    setCurrentView('dashboard');
  };

  const handleReset = () => {
    localStorage.removeItem('mentor_prefs');
    localStorage.removeItem('mentor_articles_state');
    setPrefs(null);
    setCurrentView('onboarding');
  };

  const handleMarkComplete = (id: string) => {
    const savedStates = JSON.parse(localStorage.getItem('mentor_articles_state') || '{}');
    savedStates[id] = true;
    localStorage.setItem('mentor_articles_state', JSON.stringify(savedStates));
    localStorage.setItem('mentor_last_completed_date', new Date().toDateString());
  };

  if (currentView === 'onboarding' || !prefs?.isOnboarded) {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  if (currentView === 'settings') {
    return <Settings prefs={prefs} onBack={() => setCurrentView('dashboard')} onReset={handleReset} />;
  }

  if (currentView === 'article' && selectedArticle) {
    return (
      <ArticleDetail 
        article={selectedArticle} 
        onBack={() => setCurrentView('dashboard')} 
        onMarkComplete={handleMarkComplete}
      />
    );
  }

  if (currentView === 'timeline' && prefs) {
    return (
      <TimelineView 
        prefs={prefs}
        onBack={() => setCurrentView('dashboard')}
        onOpenArticle={(article) => {
          setSelectedArticle(article);
          setCurrentView('article');
        }}
      />
    );
  }

  return (
    <Dashboard 
      prefs={prefs} 
      onOpenSettings={() => setCurrentView('settings')}
      onOpenArticle={(article) => {
        setSelectedArticle(article);
        setCurrentView('article');
      }}
      onOpenTimeline={() => setCurrentView('timeline')}
    />
  );
}
