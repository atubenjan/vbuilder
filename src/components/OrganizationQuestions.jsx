import React, { useState } from 'react';
import QuestionTabs from './QuestionTabs';

const OrganizationQuestions = () => {
  const [selectedTab, setSelectedTab] = useState('mcq');

  const handleTabChange = (type) => {
    setSelectedTab(type);
  };

  return (
    <div>
      <div className="flex gap-2">
        <button
          onClick={() => handleTabChange('mcq')}
          className={`px-4 py-2 rounded-lg ${selectedTab === 'mcq' ? 'bg-button text-white' : 'bg-gray-400 text-black'}`}
        >
          MCQs
        </button>
        <button
          onClick={() => handleTabChange('trueFalse')}
          disabled
          className={`px-4 py-2 cursor-not-allowed rounded-md ${selectedTab === 'trueFalse' ? 'bg-button text-white' : 'bg-gray-400 text-black'}`}
        >
          True/False
        </button>
        <button
          onClick={() => handleTabChange('shortAnswer')}
          disabled
          className={`px-4 py-2 cursor-not-allowed rounded-md ${selectedTab === 'shortAnswer' ? 'bg-button text-white' : 'bg-gray-400 text-black'}`}
        >
          Short Answer
        </button>
      </div>

      {/* Tab Content */}
      <QuestionTabs type={selectedTab} />
    </div>
  );
};

export default OrganizationQuestions;
