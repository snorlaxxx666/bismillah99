import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <h2 className="text-xl font-medium text-slate-700 mb-2">Loading...</h2>
        <p className="text-slate-500">Preparing your personalized experience</p>
      </div>
    </div>
  );
};

export default LoadingScreen;