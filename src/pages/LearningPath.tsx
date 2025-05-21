import React, { useState } from 'react';
import { BookOpen, CheckCircle, Lock, Star, ChevronRight } from 'lucide-react';

const LearningPath: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');

  // Mock learning path data
  const learningPaths = [
    {
      id: 1,
      title: "Foundations of Learning",
      progress: 65,
      modules: 8,
      completedModules: 5,
      isActive: true,
      image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      title: "Advanced Study Techniques",
      progress: 10,
      modules: 6,
      completedModules: 1,
      isActive: true,
      image: "https://images.pexels.com/photos/3059654/pexels-photo-3059654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "Mastering Focus & Concentration",
      progress: 0,
      modules: 5,
      completedModules: 0,
      isActive: false,
      image: "https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  // Mock modules for the first path
  const currentPathModules = [
    {
      id: 1,
      title: "Understanding Your Learning Style",
      duration: "25 min",
      xp: 120,
      status: "completed",
      type: "video"
    },
    {
      id: 2,
      title: "Setting Up Your Learning Environment",
      duration: "40 min",
      xp: 180,
      status: "completed",
      type: "interactive"
    },
    {
      id: 3,
      title: "Memory Techniques & Recall",
      duration: "35 min",
      xp: 150,
      status: "completed",
      type: "reading"
    },
    {
      id: 4,
      title: "Note-Taking Strategies",
      duration: "30 min",
      xp: 140,
      status: "completed",
      type: "video"
    },
    {
      id: 5,
      title: "Effective Reading Methods",
      duration: "45 min",
      xp: 200,
      status: "completed",
      type: "interactive"
    },
    {
      id: 6,
      title: "Time Management Skills",
      duration: "35 min",
      xp: 160,
      status: "in-progress",
      type: "video"
    },
    {
      id: 7,
      title: "Self-Testing & Spaced Practice",
      duration: "40 min",
      xp: 190,
      status: "locked",
      type: "quiz"
    },
    {
      id: 8,
      title: "Creating Your Study Schedule",
      duration: "30 min",
      xp: 170,
      status: "locked",
      type: "interactive"
    }
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">Learning Path</h1>
        <p className="text-slate-600">Personalized courses and materials based on your learning style</p>
      </header>
      
      {/* Tab navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'courses'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('recommended')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'recommended'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Recommended
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'completed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Completed
          </button>
        </nav>
      </div>
      
      {/* Learning paths section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <div key={path.id} className={`card overflow-hidden ${!path.isActive && 'opacity-75'}`}>
            <div className="h-40 overflow-hidden -mx-4 -mt-4 mb-4 relative">
              <img 
                src={path.image} 
                alt={path.title}
                className="w-full h-full object-cover"
              />
              {!path.isActive && (
                <div className="absolute inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center">
                  <Lock size={24} className="text-white" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4">
                <div className="flex items-center text-white">
                  <BookOpen size={16} className="mr-1" />
                  <span className="text-sm">{path.modules} modules</span>
                </div>
              </div>
            </div>
            
            <h3 className="font-medium text-lg mb-2">{path.title}</h3>
            
            <div className="flex justify-between text-sm text-slate-600 mb-3">
              <span>{path.completedModules}/{path.modules} completed</span>
              <span>{path.progress}%</span>
            </div>
            
            <div className="progress-bar mb-4">
              <div 
                className={`progress-bar-fill ${path.isActive ? 'bg-blue-500' : 'bg-slate-400'}`}
                style={{ width: `${path.progress}%` }}
              />
            </div>
            
            <button 
              className={`btn w-full ${
                path.isActive ? 'btn-primary' : 'btn-secondary'
              }`}
              disabled={!path.isActive}
            >
              {path.progress > 0 ? 'Continue Learning' : 'Start Course'}
            </button>
          </div>
        ))}
      </section>
      
      {/* Current path modules */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Foundations of Learning</h2>
          <span className="text-sm text-slate-500">5/8 completed</span>
        </div>
        
        <div className="space-y-4">
          {currentPathModules.map((module, index) => (
            <div 
              key={module.id}
              className={`card p-4 border-l-4 ${
                module.status === 'completed'
                  ? 'border-l-emerald-500'
                  : module.status === 'in-progress'
                  ? 'border-l-blue-500'
                  : 'border-l-slate-300'
              } flex items-center ${
                module.status === 'locked' ? 'opacity-60' : ''
              }`}
            >
              <div className="mr-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                {module.status === 'completed' ? (
                  <CheckCircle size={18} className="text-emerald-500" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium">{module.title}</h3>
                <div className="flex items-center text-sm text-slate-500 mt-1 space-x-2">
                  <span className="capitalize">{module.type}</span>
                  <span>·</span>
                  <span>{module.duration}</span>
                  <span>·</span>
                  <div className="flex items-center">
                    <Star size={14} className="text-amber-400 mr-1" fill="#fbbf24" />
                    <span>{module.xp} XP</span>
                  </div>
                </div>
              </div>
              
              <button 
                className={`btn !py-1.5 !px-3 ${
                  module.status === 'completed'
                    ? 'btn-secondary'
                    : module.status === 'in-progress'
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
                disabled={module.status === 'locked'}
              >
                {module.status === 'completed'
                  ? 'Review'
                  : module.status === 'in-progress'
                  ? 'Continue'
                  : 'Start'}
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningPath;