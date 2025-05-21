import React from 'react';
import { useUser } from '../contexts/UserContext';
import { 
  TrendingUp, CheckCircle, Brain, Calendar, ArrowUpRight, 
  BookOpen, Trophy, AlertCircle, Video
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  
  if (!user) return null;
  
  // Mock data for dashboard
  const streakData = {
    current: user.userProgress.dailyStreak,
    best: 12,
    total: 86
  };
  
  const recommendedContent = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      type: "course",
      icon: <BookOpen size={18} />,
      progress: 35,
      duration: "45 min",
      color: "blue"
    },
    {
      id: 2,
      title: "Weekly Coding Challenge",
      type: "challenge",
      icon: <Trophy size={18} />,
      duration: "20 min",
      color: "amber"
    },
    {
      id: 3,
      title: "Deep Focus Techniques",
      type: "video",
      icon: <Video size={18} />,
      duration: "12 min",
      color: "emerald"
    }
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-slate-600">Here's an overview of your learning journey</p>
      </header>
      
      {/* Progress Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Daily Streak</h3>
            <Calendar size={20} />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold">{streakData.current} days</span>
            <span className="text-blue-100 text-sm">Best: {streakData.best} days</span>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full ${
                  i < 5 ? 'bg-white bg-opacity-80' : 'bg-blue-200 bg-opacity-30'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-slate-700">XP Points</h3>
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{user.userProgress.xp}</span>
            <span className="text-emerald-500 text-sm flex items-center">
              +250 <ArrowUpRight size={16} />
            </span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Level {user.userProgress.level}</span>
              <span>Level {user.userProgress.level + 1}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill bg-emerald-500" 
                style={{ width: `${user.progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {1000 - (user.userProgress.xp % 1000)} XP until next level
            </p>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-slate-700">Completed Tasks</h3>
            <CheckCircle size={20} className="text-purple-500" />
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold">{user.userProgress.completedTasks}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-slate-100 rounded-lg p-3">
              <h4 className="text-sm text-slate-600">Daily Tasks</h4>
              <p className="font-semibold">3/5</p>
            </div>
            <div className="bg-slate-100 rounded-lg p-3">
              <h4 className="text-sm text-slate-600">Challenges</h4>
              <p className="font-semibold">{user.userProgress.completedChallenges}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Daily focus */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Focus</h2>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            View all
          </button>
        </div>
        
        <div className="card border-l-4 border-l-amber-500 p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-medium">
                Priority
              </span>
              <h3 className="text-lg font-medium mt-2">Complete STEM Challenge</h3>
              <p className="text-slate-600 mt-1">
                Solve problem #42 in your mathematics module
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-sm">Due today</span>
              <AlertCircle size={16} className="text-amber-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Brain size={16} className="text-blue-500" />
                <span>Math ·</span>
                <span>20 min ·</span>
                <span>30 XP</span>
              </div>
            </div>
            <button className="btn btn-primary !py-1.5">
              Start Now
            </button>
          </div>
        </div>
      </section>
      
      {/* Recommended content */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended For You</h2>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            See more
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedContent.map((item) => (
            <div key={item.id} className="card hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-lg bg-${item.color}-100 flex items-center justify-center mb-3`}>
                <span className={`text-${item.color}-600`}>{item.icon}</span>
              </div>
              <h3 className="font-medium mb-1">{item.title}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <span className="capitalize">{item.type}</span>
                <span>·</span>
                <span>{item.duration}</span>
              </div>
              
              {item.progress !== undefined && (
                <div className="mb-3">
                  <div className="progress-bar">
                    <div 
                      className={`progress-bar-fill bg-${item.color}-500`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.progress}% complete</p>
                </div>
              )}
              
              <button 
                className={`btn !py-1.5 w-full ${
                  item.progress !== undefined ? 'btn-secondary' : 'btn-primary'
                }`}
              >
                {item.progress !== undefined ? 'Continue' : 'Start Learning'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;