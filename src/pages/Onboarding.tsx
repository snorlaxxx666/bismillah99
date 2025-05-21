import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ChevronRight, CheckCircle, User, Lock, Sparkles } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Onboarding: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    learningStyle: '',
    interests: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLearningStyleSelect = (style: string) => {
    setFormData(prev => ({ ...prev, learningStyle: style }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const updatedInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return { ...prev, interests: updatedInterests };
    });
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would register the user with the formData
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Account</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Password must be at least 8 characters
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleNext}
              disabled={!formData.name || !formData.email || !formData.password}
              className="mt-6 w-full btn btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        );
        
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">How Do You Learn Best?</h2>
            <p className="text-slate-600 mb-6 text-center">
              This helps us personalize your learning experience
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleLearningStyleSelect('visual')}
                className={`p-4 rounded-lg border ${
                  formData.learningStyle === 'visual'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:bg-slate-50'
                } transition-colors flex flex-col items-center`}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Sparkles size={24} className="text-blue-600" />
                </div>
                <h3 className="font-medium">Visual Learner</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Learn best through images, videos, and diagrams
                </p>
              </button>
              
              <button
                type="button"
                onClick={() => handleLearningStyleSelect('auditory')}
                className={`p-4 rounded-lg border ${
                  formData.learningStyle === 'auditory'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 hover:bg-slate-50'
                } transition-colors flex flex-col items-center`}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Brain size={24} className="text-purple-600" />
                </div>
                <h3 className="font-medium">Auditory Learner</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Learn best through listening and discussing
                </p>
              </button>
              
              <button
                type="button"
                onClick={() => handleLearningStyleSelect('reading')}
                className={`p-4 rounded-lg border ${
                  formData.learningStyle === 'reading'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 hover:bg-slate-50'
                } transition-colors flex flex-col items-center`}
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                  </svg>
                </div>
                <h3 className="font-medium">Reading/Writing</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Learn best through reading and taking notes
                </p>
              </button>
              
              <button
                type="button"
                onClick={() => handleLearningStyleSelect('kinesthetic')}
                className={`p-4 rounded-lg border ${
                  formData.learningStyle === 'kinesthetic'
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-200 hover:bg-slate-50'
                } transition-colors flex flex-col items-center`}
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                </div>
                <h3 className="font-medium">Kinesthetic</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Learn best through hands-on activities and practice
                </p>
              </button>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                type="button" 
                onClick={handleBack}
                className="btn btn-secondary"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.learningStyle}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">What Are Your Interests?</h2>
            <p className="text-slate-600 mb-6 text-center">
              Select at least 3 topics that interest you
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Science', 'Math', 'Languages', 'History', 'Arts', 'Music', 
                'Technology', 'Programming', 'Literature', 'Philosophy', 'Business', 'Health'].map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest.toLowerCase())}
                  className={`px-4 py-3 rounded-lg border ${
                    formData.interests.includes(interest.toLowerCase())
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:bg-slate-50'
                  } transition-colors flex items-center justify-between`}
                >
                  <span>{interest}</span>
                  {formData.interests.includes(interest.toLowerCase()) && (
                    <CheckCircle size={18} className="text-blue-500" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                type="button" 
                onClick={handleBack}
                className="btn btn-secondary"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={formData.interests.length < 3 || isLoading}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Setting up...
                  </div>
                ) : (
                  'Complete Setup'
                )}
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain size={32} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-blue-600">GrowthMind</h1>
          <p className="text-slate-500 mt-2">Your personalized learning journey</p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {i < step ? <CheckCircle size={16} /> : i}
                </div>
                {i < 3 && (
                  <div 
                    className={`flex-1 h-1 mx-2 ${
                      i < step ? 'bg-blue-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default Onboarding;