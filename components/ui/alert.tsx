import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`max-w-md w-full p-6 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4 p-1 bg-white text-black rounded-full">
            ✕
          </button>
        </div>
        <button 
          onClick={onClose} 
          className="mt-3 w-full p-2 rounded bg-white text-black hover:bg-gray-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;
