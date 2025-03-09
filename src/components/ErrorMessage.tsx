import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center p-4 mb-4 text-sm text-red-500 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
      <AlertCircle className="inline w-5 h-5 mr-3" />
      <span className="sr-only">Error</span>
      <div>
        <span className="font-medium">Error:</span> {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
