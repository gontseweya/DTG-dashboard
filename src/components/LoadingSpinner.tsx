import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="animate-spin h-5 w-5 mr-3" />
      <span>Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
