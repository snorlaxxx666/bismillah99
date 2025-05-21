import React, { useState } from 'react';
import { LineChart, CheckCircle2, ListTodo, ArrowUp, ArrowDown, Brain } from 'lucide-react';

const SelfReflection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reflect');
  
  // Mock reflection data
  const reflectionPrompts = [
    "What's one thing I learned today?",
    "What did I find challenging, and how did I overcome it?",
    "How can I apply what I learned in other areas?",
    "What went well in my study session today?",
    "What could I improve for next time?"
  ];
  
  const [selectedPrompt, setSelectedPrompt] = useState(reflectionPrompts[0]);
  const [reflectionText, setReflectionText] = useState('');
  
  // Mock journal entries
  const journalEntries = [
    {
      id: 1,
      date: "July 12, 2025",
      prompt: "What's one thing I learned today?",
      content: "I learned about the concept of spaced repetition and how it can dramatically improve retention compared to cramming. Going to implement this in my study schedule starting tomorrow.",
      mood: "positive"
    },
    {
      id: 2,
      date: "July 10, 2025",
      prompt: "What did I find challenging, and how did I overcome it?",
      content: "Struggled with focus today due to outside distractions. I tried the Pomodoro technique (25 min work, 5 min break) and it helped me stay on track. Will continue using this approach.",
      mood: "neutral"
    },
    {
      id: 3,
      date: "July 7, 2025",
      prompt: "What could I improve for next time?",
      content: "Need to prepare better for my study sessions. I wasted time gathering materials and deciding what to focus on. Tomorrow I'll set up everything the night before.",
      mood: "negative"
    }
  ];

  // Mock progress data
  const progressData = {
    strengths: [
      "Problem-solving",
      "Visual learning",
      "Reading comprehension"
    ],
    improvements: [
      "Time management",
      "Note organization",
      "Verbal explanations"
    ],
    goals: [
      { text: "Complete 5 practice tests", progress: 60 },
      { text: "Study 30 mins daily", progress: 85 },
      { text: "Organize study materials", progress: 40 }
    ]
  };

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would save this reflection
    alert("Reflection saved!");
    setReflectionText('');
  };

  return (
    <div className="animate-fade-in space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">Self Reflection</h1>
        <p className="text-slate-600">Track your progress and reflect on your learning journey</p>
      </header>
      
      {/* Tab navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('reflect')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'reflect'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Daily Reflection
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'journal'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Journal
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'progress'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Progress Tracking
          </button>
        </nav>
      </div>
      
      {/* Daily Reflection */}
      {activeTab === 'reflect' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Today's Reflection</h2>
              
              <div className="mb-6">
                <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 mb-2">
                  Choose a prompt:
                </label>
                <select
                  id="prompt"
                  value={selectedPrompt}
                  onChange={(e) => setSelectedPrompt(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {reflectionPrompts.map((prompt, index) => (
                    <option key={index} value={prompt}>
                      {prompt}
                    </option>
                  ))}
                </select>
              </div>
              
              <form onSubmit={handleReflectionSubmit}>
                <div className="mb-4">
                  <label htmlFor="reflection" className="block text-lg font-medium text-slate-800 mb-2">
                    {selectedPrompt}
                  </label>
                  <textarea
                    id="reflection"
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    rows={6}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-2">Rate your overall learning experience today:</p>
                  <div className="flex space-x-4">
                    {['Challenging', 'Neutral', 'Productive'].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          className="mr-2"
                        />
                        {rating}
                      </label>
                    ))}
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={!reflectionText.trim()}
                >
                  Save Reflection
                </button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Reflection Tips</h2>
              
              <ul className="space-y-3">
                <li className="flex">
                  <CheckCircle2 size={20} className="text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <p className="text-slate-700">Be specific about what you learned</p>
                </li>
                <li className="flex">
                  <CheckCircle2 size={20} className="text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <p className="text-slate-700">Consider both successes and challenges</p>
                </li>
                <li className="flex">
                  <CheckCircle2 size={20} className="text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <p className="text-slate-700">Identify patterns in your learning style</p>
                </li>
                <li className="flex">
                  <CheckCircle2 size={20} className="text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <p className="text-slate-700">Think about how to apply what you've learned</p>
                </li>
                <li className="flex">
                  <CheckCircle2 size={20} className="text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <p className="text-slate-700">Set clear goals for next time</p>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                  <Brain size={18} className="mr-2" />
                  Why Reflection Matters
                </h3>
                <p className="text-blue-700 text-sm">
                  Research shows that students who regularly reflect on their learning process retain information better and develop stronger metacognitive skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Journal */}
      {activeTab === 'journal' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Reflection Journal</h2>
            <button className="btn btn-primary">New Entry</button>
          </div>
          
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="card p-5 hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-500">{entry.date}</p>
                    <h3 className="font-medium text-lg mt-1">{entry.prompt}</h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full ${
                    entry.mood === 'positive'
                      ? 'bg-emerald-100 text-emerald-600'
                      : entry.mood === 'negative'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-amber-100 text-amber-600'
                  } flex items-center justify-center`}>
                    {entry.mood === 'positive' ? '😊' : entry.mood === 'negative' ? '😔' : '😐'}
                  </div>
                </div>
                
                <p className="mt-3 text-slate-700">{entry.content}</p>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-blue-600 hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <button className="btn btn-secondary">Load More Entries</button>
          </div>
        </div>
      )}
      
      {/* Progress Tracking */}
      {activeTab === 'progress' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Strengths</h3>
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <ArrowUp size={18} />
                </div>
              </div>
              
              <ul className="space-y-2">
                {progressData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 size={18} className="text-emerald-500 mr-2" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
              
              <button className="btn btn-secondary w-full mt-4">Add Strength</button>
            </div>
            
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Areas for Improvement</h3>
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <ArrowDown size={18} />
                </div>
              </div>
              
              <ul className="space-y-2">
                {progressData.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-center">
                    <ListTodo size={18} className="text-amber-500 mr-2" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
              
              <button className="btn btn-secondary w-full mt-4">Add Area</button>
            </div>
          </div>
          
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Active Goals</h3>
              <LineChart size={20} className="text-blue-600" />
            </div>
            
            <div className="space-y-6">
              {progressData.goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{goal.text}</h4>
                    <span className="text-slate-500">{goal.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-bar-fill ${
                        goal.progress >= 80 
                          ? 'bg-emerald-500' 
                          : goal.progress >= 50 
                          ? 'bg-blue-500' 
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn btn-primary w-full mt-8">Set New Goal</button>
          </div>
          
          <div className="card p-5">
            <h3 className="font-semibold text-lg mb-4">Weekly Learning Activity</h3>
            
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-xs text-slate-500">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {[3, 1, 4, 2, 5, 2, 3].map((value, index) => (
                <div 
                  key={index}
                  className={`h-16 rounded-lg flex items-center justify-center ${
                    value === 1 ? 'bg-blue-100' : 
                    value === 2 ? 'bg-blue-200' : 
                    value === 3 ? 'bg-blue-300' : 
                    value === 4 ? 'bg-blue-400' : 
                    'bg-blue-500'
                  }`}
                >
                  <span className={`font-medium ${value >= 4 ? 'text-white' : 'text-blue-800'}`}>
                    {value}h
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <p className="text-slate-700">
                <span className="font-medium">20 hours</span> of study time this week
              </p>
              <p className="text-sm text-slate-500">30% increase from last week</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfReflection;