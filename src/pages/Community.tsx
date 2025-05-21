import React, { useState } from 'react';
import { MessageSquare, User, Users, Search, ThumbsUp, MessageCircle, Share2, Send, PlusCircle } from 'lucide-react';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPostText, setNewPostText] = useState('');
  
  // Mock community data
  const posts = [
    {
      id: 1,
      user: {
        name: "Nugraha",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/687px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg",
        level: 8
      },
      content: "Just completed the advanced mathematics module with a 95% score! The visualization techniques from last week's workshop really helped with understanding complex functions. Anyone else finding them useful?",
      likes: 24,
      comments: 7,
      time: "2 hours ago",
      isLiked: true
    },
    {
      id: 2,
      user: {
        name: "Alex Johnson",
        avatar: undefined,
        level: 5
      },
      content: "Struggling with the physics formulas in chapter 8. Anyone have good resources or memory tricks they can share?",
      likes: 11,
      comments: 16,
      time: "5 hours ago",
      isLiked: false
    },
    {
      id: 3,
      user: {
        name: "Sam Riley",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        level: 12
      },
      content: "Found an amazing study playlist that really helps with focus. The lofi beats combined with nature sounds keep me in the zone for hours! Link in the comments if anyone wants to try it.",
      likes: 37,
      comments: 9,
      time: "1 day ago",
      isLiked: false
    }
  ];
  
  const groups = [
    {
      id: 1,
      name: "Mathematics Study Group",
      members: 128,
      activities: 15,
      image: "https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "Language Learning Exchange",
      members: 256,
      activities: 32,
      image: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "Science & Technology",
      members: 194,
      activities: 23,
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      name: "Test Preparation",
      members: 145,
      activities: 18,
      image: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
  
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialization: "Mathematics",
      rating: 4.9,
      students: 328,
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "Prof. Michael Lee",
      specialization: "Physics",
      rating: 4.8,
      students: 215,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "Julia Roberts",
      specialization: "Language Arts",
      rating: 4.7,
      students: 189,
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostText.trim()) {
      // In a real app, would add the post to the posts array
      alert("Post submitted!");
      setNewPostText('');
    }
  };

  const toggleLike = (postId: number) => {
    // Would implement actual like toggling in a real app
  };

  return (
    <div className="animate-fade-in space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">Learning Community</h1>
        <p className="text-slate-600">Connect with fellow learners, join groups, and find mentors</p>
      </header>
      
      {/* Tab navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('feed')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'feed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center">
              <MessageSquare size={18} className="mr-2" />
              Feed
            </div>
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'groups'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center">
              <Users size={18} className="mr-2" />
              Groups
            </div>
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${
              activeTab === 'mentors'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              Mentors
            </div>
          </button>
        </nav>
      </div>
      
      {/* Community Feed */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="card p-4">
              <form onSubmit={handlePostSubmit}>
                <div className="flex items-start">
                  <div className="avatar w-10 h-10 mr-3 bg-blue-100 text-blue-600">
                    <span className="text-lg">A</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Share your thoughts or ask a question..."
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                    <div className="flex justify-between mt-3">
                      <div className="flex space-x-2">
                        <button type="button" className="btn btn-secondary !py-1.5 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                            <circle cx="9" cy="9" r="2"></circle>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                          </svg>
                          Photo
                        </button>
                        <button type="button" className="btn btn-secondary !py-1.5 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                          File
                        </button>
                      </div>
                      <button 
                        type="submit" 
                        className="btn btn-primary !py-1.5"
                        disabled={!newPostText.trim()}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Posts */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="card p-4 hover:shadow-md transition-all">
                  <div className="flex items-center mb-3">
                    <div className="avatar w-10 h-10 mr-3">
                      {post.user.avatar ? (
                        <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg">{post.user.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{post.user.name}</h3>
                        <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                          Lvl {post.user.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{post.time}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4">{post.content}</p>
                  
                  <div className="flex border-t border-slate-200 pt-3">
                    <button 
                      className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${
                        post.isLiked ? 'text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <ThumbsUp size={18} className={post.isLiked ? 'fill-current' : ''} />
                      <span className="ml-2">{post.likes}</span>
                    </button>
                    
                    <button className="flex-1 flex items-center justify-center py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MessageCircle size={18} />
                      <span className="ml-2">{post.comments}</span>
                    </button>
                    
                    <button className="flex-1 flex items-center justify-center py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <Share2 size={18} />
                      <span className="ml-2">Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button className="btn btn-secondary">Load More Posts</button>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Search */}
            <div className="card p-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* Popular Groups */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Popular Groups</h3>
                <button className="text-blue-600 text-sm hover:underline">See All</button>
              </div>
              
              <div className="space-y-3">
                {groups.slice(0, 3).map((group) => (
                  <div key={group.id} className="flex items-center hover:bg-slate-50 p-2 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-slate-200 rounded-lg overflow-hidden mr-3">
                      <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{group.name}</h4>
                      <p className="text-xs text-slate-500">{group.members} members</p>
                    </div>
                    <button className="text-xs text-blue-600 font-medium">Join</button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Top Mentors */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Top Mentors</h3>
                <button className="text-blue-600 text-sm hover:underline">Browse All</button>
              </div>
              
              <div className="space-y-3">
                {mentors.slice(0, 2).map((mentor) => (
                  <div key={mentor.id} className="flex items-center hover:bg-slate-50 p-2 rounded-lg transition-colors">
                    <div className="avatar w-10 h-10 mr-3">
                      <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{mentor.name}</h4>
                      <p className="text-xs text-slate-500">{mentor.specialization}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < Math.floor(mentor.rating) ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-slate-500 ml-1">{mentor.rating}</span>
                      </div>
                    </div>
                    <button className="btn btn-primary !py-1 !px-2 text-xs">Connect</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Groups */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search groups..."
                className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button className="btn btn-primary flex items-center">
              <PlusCircle size={18} className="mr-2" />
              Create Group
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="card overflow-hidden hover:shadow-md transition-all">
                <div className="h-40 -mx-4 -mt-4 mb-4 relative">
                  <img 
                    src={group.image} 
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-white text-lg">{group.name}</h3>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users size={16} className="text-slate-500 mr-1" />
                    <span className="text-sm text-slate-600">{group.members} members</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare size={16} className="text-slate-500 mr-1" />
                    <span className="text-sm text-slate-600">{group.activities} activities</span>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <button className="btn btn-secondary flex-1 mr-2">Preview</button>
                  <button className="btn btn-primary flex-1">Join Group</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <button className="btn btn-secondary">Load More Groups</button>
          </div>
        </div>
      )}
      
      {/* Mentors */}
      {activeTab === 'mentors' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search mentors by name or subject..."
                className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-slate-600 mr-2">Filter by:</span>
              <select className="border border-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Language Arts</option>
                <option>Chemistry</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.concat(mentors).map((mentor, index) => (
              <div key={`${mentor.id}-${index}`} className="card p-5 hover:shadow-md transition-all">
                <div className="flex items-center">
                  <div className="avatar w-16 h-16 mr-4">
                    <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{mentor.name}</h3>
                    <p className="text-slate-600">{mentor.specialization} Expert</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm ml-1 text-slate-600">{mentor.rating}</span>
                      <span className="text-sm text-slate-500 ml-2">({mentor.students} students)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <h4 className="font-medium mb-1">About:</h4>
                  <p className="text-sm text-slate-600">
                    Experienced educator with a passion for making complex concepts easy to understand. 
                    Specializes in personalized teaching approaches.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="btn btn-secondary">Message</button>
                  <button className="btn btn-primary">Schedule Session</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <button className="btn btn-secondary">Load More Mentors</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;