import React from 'react';
import { Loader } from 'lucide-react';

const Spinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center p-5">
            <Loader className="animate-spin text-blue-500" size={48} />
        </div>
    );
};

export default Spinner;