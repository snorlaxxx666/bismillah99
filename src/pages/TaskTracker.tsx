import React, { useState } from 'react';
import { CheckCircle, Plus, Calendar, MoreVertical, Clock, ArrowUpRight, X } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: string;
}

const TaskTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'habits'>('tasks');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    priority: 'medium',
    category: 'study',
    status: 'pending'
  });
  
  // Mock tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete calculus homework",
      description: "Chapter 5 exercises 1-10",
      dueDate: "2025-07-15",
      status: "pending",
      priority: "high",
      category: "study"
    },
    {
      id: 2,
      title: "Read 30 pages of textbook",
      dueDate: "2025-07-14",
      status: "completed",
      priority: "medium",
      category: "reading"
    },
    {
      id: 3,
      title: "Prepare notes for study group",
      description: "Focus on key concepts from last lecture",
      dueDate: "2025-07-16",
      status: "pending",
      priority: "medium",
      category: "study"
    },
    {
      id: 4,
      title: "Research paper outline",
      status: "pending",
      priority: "low",
      category: "project"
    }
  ]);

  // Mock habits data
  const habits = [
    {
      id: 1,
      title: "Read for 30 minutes",
      streak: 8,
      targetDays: 5,
      completedToday: true,
      category: "reading"
    },
    {
      id: 2,
      title: "Practice problem solving",
      streak: 3,
      targetDays: 4,
      completedToday: false,
      category: "study"
    },
    {
      id: 3,
      title: "Review notes before bed",
      streak: 12,
      targetDays: 7,
      completedToday: true,
      category: "study"
    }
  ];

  const handleAddTask = () => {
    if (newTask.title?.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        status: 'pending',
        priority: newTask.priority as 'low' | 'medium' | 'high',
        category: newTask.category as string
      };
      
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        priority: 'medium',
        category: 'study',
        status: 'pending'
      });
      setShowAddTask(false);
    }
  };

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return '📚';
      case 'reading': return '📖';
      case 'project': return '🧩';
      default: return '📝';
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Task & Habit Tracker</h1>
          <p className="text-slate-600">Manage your daily tasks and build productive habits</p>
        </div>
        <button 
          className="btn btn-primary !p-3 rounded-full"
          onClick={() => setShowAddTask(true)}
          aria-label="Add task"
        >
          <Plus size={20} />
        </button>
      </header>
      
      {/* Tab navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'tasks'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('habits')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'habits'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Habits
          </button>
        </nav>
      </div>
      
      {/* Tasks section */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
            
            <div className="space-y-3">
              {tasks
                .filter(task => task.status === 'pending')
                .map(task => (
                  <div 
                    key={task.id} 
                    className="card p-4 border hover:border-blue-200 transition-colors flex items-start"
                  >
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`w-6 h-6 rounded-full border ${
                        task.status === 'completed'
                          ? 'bg-emerald-500 border-emerald-500 text-white flex items-center justify-center'
                          : 'border-slate-300'
                      } mr-3 mt-0.5 transition-colors hover:border-blue-500 shrink-0`}
                    >
                      {task.status === 'completed' && <CheckCircle size={14} />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                          {task.title}
                        </h3>
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                      
                      {task.description && (
                        <p className="text-slate-600 text-sm mt-1">{task.description}</p>
                      )}
                      
                      <div className="flex items-center mt-2 text-sm space-x-3">
                        <span className="flex items-center">
                          <span className="mr-1">{getCategoryIcon(task.category)}</span>
                          <span className="capitalize">{task.category}</span>
                        </span>
                        
                        {task.dueDate && (
                          <span className="flex items-center text-slate-500">
                            <Calendar size={14} className="mr-1" />
                            {new Date(task.dueDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        )}
                        
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              
              {tasks.filter(task => task.status === 'pending').length === 0 && (
                <div className="card p-6 border border-dashed border-slate-300 text-center">
                  <h3 className="font-medium text-slate-700 mb-2">All caught up!</h3>
                  <p className="text-slate-500 text-sm">You have no pending tasks for today.</p>
                  <button 
                    className="btn btn-primary mt-4"
                    onClick={() => setShowAddTask(true)}
                  >
                    Add a new task
                  </button>
                </div>
              )}
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold mb-4">Completed</h2>
            
            <div className="space-y-3">
              {tasks
                .filter(task => task.status === 'completed')
                .map(task => (
                  <div 
                    key={task.id} 
                    className="card p-4 border border-slate-200 flex items-start bg-slate-50"
                  >
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="w-6 h-6 rounded-full bg-emerald-500 border-emerald-500 text-white flex items-center justify-center mr-3 mt-0.5 shrink-0"
                    >
                      <CheckCircle size={14} />
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium line-through text-slate-500">
                          {task.title}
                        </h3>
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center mt-2 text-sm space-x-3">
                        <span className="flex items-center text-slate-500">
                          <span className="mr-1">{getCategoryIcon(task.category)}</span>
                          <span className="capitalize">{task.category}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              
              {tasks.filter(task => task.status === 'completed').length === 0 && (
                <p className="text-slate-500 text-center py-4">No completed tasks yet</p>
              )}
            </div>
          </section>
        </div>
      )}
      
      {/* Habits section */}
      {activeTab === 'habits' && (
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4">Daily Habits</h2>
            
            <div className="space-y-4">
              {habits.map(habit => (
                <div key={habit.id} className="card p-4 border hover:border-blue-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full ${
                        habit.completedToday 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-slate-100 text-slate-600'
                      } flex items-center justify-center mr-3`}>
                        <span>{getCategoryIcon(habit.category)}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{habit.title}</h3>
                        <div className="flex items-center text-sm text-slate-500 mt-1">
                          <Clock size={14} className="mr-1" />
                          <span>{habit.targetDays} days/week</span>
                          <span className="mx-2">·</span>
                          <span className="flex items-center text-amber-600">
                            <span className="font-medium">{habit.streak}</span>
                            <ArrowUpRight size={14} className="ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className={`w-6 h-6 rounded-full ${
                        habit.completedToday
                          ? 'bg-emerald-500 text-white'
                          : 'border border-slate-300'
                      } flex items-center justify-center`}
                    >
                      {habit.completedToday && <CheckCircle size={14} />}
                    </button>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full ${
                          i < 5 ? (
                            i < habit.streak % 7 
                              ? 'bg-emerald-500' 
                              : 'bg-slate-200'
                          ) : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              
              <button className="card p-4 border border-dashed border-slate-300 text-center w-full hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-center text-blue-600">
                  <Plus size={18} className="mr-2" />
                  <span className="font-medium">Create a new habit</span>
                </div>
              </button>
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
            
            <div className="card p-4 border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Completion Rate</h3>
                <div className="text-lg font-semibold">71%</div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Monday</span>
                    <span>3/3</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '100%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tuesday</span>
                    <span>2/3</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '66%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Wednesday</span>
                    <span>3/3</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '100%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Thursday</span>
                    <span>1/3</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '33%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Friday</span>
                    <span>2/3</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '66%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Saturday</span>
                    <span>1/3</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '33%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sunday</span>
                    <span>3/3</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      
      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Task</h2>
              <button 
                onClick={() => setShowAddTask(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What do you need to do?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTask.description || ''}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add details about this task"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate || ''}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={newTask.priority || 'medium'}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={newTask.category || 'study'}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="study">Study</option>
                  <option value="reading">Reading</option>
                  <option value="project">Project</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowAddTask(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTask}
                disabled={!newTask.title}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTracker;