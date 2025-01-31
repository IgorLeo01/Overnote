import React from 'react';

interface ToolBarProps {
  onSubmit: () => void;
  onChangePrivacy: (privacy: string) => void;
  privacy: string;
}

const ToolBar: React.FC<ToolBarProps> = ({ onSubmit, onChangePrivacy, privacy }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <button
          onClick={() => onChangePrivacy(privacy === 'public' ? 'private' : 'public')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {privacy === 'public' ? 'Make Private' : 'Make Public'}
        </button>
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
};

export default ToolBar;