import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import QuestionToggleButtons from './QuestionToggleButtons';
import AddMCQQuestions from './AddMCQQuestions';
import AllQuestions from './AllQuestions';

const QuestionSetting = ({ role }) => {
  const [activeTab, setActiveTab] = useState(() => {
    switch (role) {
      case 'admin':
        return 'questionTypes';
      case 'organization':
        return 'addQuestion';
      case 'user':
        return 'allQuestions';
      default:
        return null;
    }
  });
  const [quizzes, setQuizzes] = useState([]);

  const addQuizToAllQuestions = (quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  const handleAttemptQuiz = (quiz) => {
    console.log('Attempting quiz:', quiz);
  };

  useEffect(() => {
    // Ensure the active tab is reset when the role changes
    switch (role) {
      case 'admin':
        setActiveTab('questionTypes');
        break;
      case 'organization':
        setActiveTab('addQuestion');
        break;
      case 'user':
        setActiveTab('allQuestions');
        break;
      default:
        setActiveTab(null);
    }
  }, [role]);

  return (
    <div className="p-4 bg-white rounded-lg">
      <div
        className={`items-center justify-start block gap-3 pb-3 mb-4 ${role === 'organization' ? 'border-b-2 border-gray-200' : 'border-b-0'} sm:flex`}
      >
        {role === 'admin' ? (
          <>
            <div className="pb-2">
              <button
                onClick={() => setActiveTab('questionTypes')}
                className={`px-4 py-2 rounded-md ${activeTab === 'questionTypes' ? 'bg-button text-white' : 'bg-gray-200 text-black'}`}
              >
                Activate Question Type
              </button>
            </div>
            <div className="pb-2">
              <button
                onClick={() => setActiveTab('allQuestions')}
                className={`px-4 py-2 rounded-md ${activeTab === 'allQuestions' ? 'bg-button text-white' : 'bg-gray-200 text-black'}`}
              >
                All Questions
              </button>
            </div>
          </>
        ) : role === 'organization' ? (
          <>
            <div className="pb-2">
              <button
                onClick={() => setActiveTab('addQuestion')}
                className={`px-4 py-2 rounded-md ${activeTab === 'addQuestion' ? 'bg-button text-white' : 'bg-gray-200 text-black'}`}
              >
                Add Questions
              </button>
            </div>
            <div className="pb-2">
              <button
                onClick={() => setActiveTab('allQuestions')}
                className={`px-4 py-2 rounded-md ${activeTab === 'allQuestions' ? 'bg-button text-white' : 'bg-gray-200 text-black'}`}
              >
                All Questions
              </button>
            </div>
          </>
        ) : role === 'user' ? (
          <div className="w-full">
            <AllQuestions quizzes={quizzes} onAttemptQuiz={handleAttemptQuiz} />
          </div>
        ) : null}
      </div>

      {activeTab === 'questionTypes' && role === 'admin' && (
        <QuestionToggleButtons />
      )}
      {activeTab === 'addQuestion' && role === 'organization' && (
        <AddMCQQuestions addQuizToAllQuestions={addQuizToAllQuestions} />
      )}
      {activeTab === 'allQuestions' && role === 'organization' && (
        <div className="w-full">
          <AllQuestions quizzes={quizzes} onAttemptQuiz={handleAttemptQuiz} />
        </div>
      )}
      {activeTab === 'allQuestions' && role === 'admin' && (
        <div className="w-full">
          <AllQuestions quizzes={quizzes} onAttemptQuiz={handleAttemptQuiz} />
        </div>
      )}
    </div>
  );
};

QuestionSetting.propTypes = {
  role: PropTypes.string.isRequired,
};

export default QuestionSetting;
