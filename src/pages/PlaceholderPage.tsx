import React from 'react';
import { useLocation } from 'react-router-dom';
import { BackButton } from '../components/BackButton';

export const PlaceholderPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.slice(1); // Remove leading slash

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
            {path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            This is a placeholder page for the {path} exercise. The actual implementation would go here.
          </p>
        </div>
      </div>
    </div>
  );
};