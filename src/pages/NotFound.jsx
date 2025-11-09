import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <h2 className="text-4xl font-semibold text-white">Page Not Found</h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        <Link 
          to="/" 
          className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;