import React from 'react';

interface ToolBarProps {
  onSubmit: () => void;
  onChangePrivacy: (privacy: string) => void;
  privacy: string;
}

const ToolBar: React.FC<ToolBarProps> = ({ onSubmit, onChangePrivacy, privacy }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      {/* Indicativo de privacidade */}
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-gray-700">
          {privacy === 'public' ? 'Public' : 'Private'} Note
        </span>

        <div className="relative">
          <button
            onClick={() => onChangePrivacy(privacy === 'public' ? 'private' : 'public')}
            className={`relative inline-flex items-center w-12 h-6 rounded-full transition-colors 
              ${privacy === 'public' ? 'bg-blue-500' : 'bg-gray-500'}`}
          >
            <span
              className={`block w-6 h-6 rounded-full transition-transform transform ${
                privacy === 'public' ? 'translate-x-0' : 'translate-x-6'
              }`}
              style={{
                transition: 'transform 0.3s ease-in-out',
                backgroundColor: 'white',
              }}
            />
          </button>
        </div>
      </div>

     
      <div>
        <button
          onClick={onSubmit} 
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ToolBar;
