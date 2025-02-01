import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/')}
            className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base"
        >
            <ArrowLeft size={20} className="flex-shrink-0" />
            Back to Calendar
        </button>
    );
};