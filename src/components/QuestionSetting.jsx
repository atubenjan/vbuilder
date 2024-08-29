import React, { useState } from 'react';

const QuestionSetting = () => {
  const [showMCQ, setShowMCQ] = useState(false);
  const [showTrueFalse, setShowTrueFalse] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState({});

  const handleMCQToggle = () => {
    setShowMCQ(!showMCQ);
  };

  const handleTrueFalseToggle = () => {
    setShowTrueFalse(!showTrueFalse);
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  const handleToggleQuestion = (questionId) => {
    setSelectedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const isQuestionSelected = (questionId) => !!selectedQuestions[questionId];

  const mcqQuestions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
  ];

  const trueFalseQuestions = [
    {
      id: 1,
      question: 'The Earth is flat.',
      correctAnswer: 'False',
    },
    {
      id: 2,
      question: 'Water freezes at 0°C.',
      correctAnswer: 'True',
    },
  ];

  return (
    <div className="p-4 pt-14">
      <div className="mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={showMCQ} 
            onChange={handleMCQToggle} 
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
            MCQ
          </span>
        </label>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={showTrueFalse} 
            onChange={handleTrueFalseToggle} 
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
            True/False
          </span>
        </label>
      </div>

      {showMCQ && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Multiple Choice Questions</h2>
          <ul>
            {mcqQuestions.map((q) => (
              <li
                key={q.id}
                className={`p-1 mb-1 ${isQuestionSelected(q.id) ? 'bg-gray-100' : ''}`}
              >
                <div className="flex items-center mb-1">
                  <button
                    onClick={() => handleToggleQuestion(q.id)}
                    className={`px-2 py-1 mr-2 rounded ${isQuestionSelected(q.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {isQuestionSelected(q.id) ? 'Deselect' : 'Select'}
                  </button>
                  <div className="font-semibold">{q.question}</div>
                </div>
                {isQuestionSelected(q.id) && (
                  <ul className="mt-2">
                    {q.options.map((option, index) => (
                      <li key={index} className="mt-1">
                        <label>
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                            checked={selectedAnswers[q.id] === option}
                            onChange={() => handleOptionChange(q.id, option)}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showTrueFalse && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">True/False Questions</h2>
          <ul>
            {trueFalseQuestions.map((q) => (
              <li
                key={q.id}
                className={`p-1 mb-1 ${isQuestionSelected(q.id) ? 'bg-gray-100' : ''}`}
              >
                <div className="flex items-center mb-2">
                  <button
                    onClick={() => handleToggleQuestion(q.id)}
                    className={`px-2 py-1 mr-2 rounded ${isQuestionSelected(q.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {isQuestionSelected(q.id) ? 'Deselect' : 'Select'}
                  </button>
                  <div className="font-semibold">{q.question}</div>
                </div>
                {isQuestionSelected(q.id) && (
                  <ul className="mt-2">
                    {['True', 'False'].map((option, index) => (
                      <li key={index} className="mt-1">
                        <label>
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                            checked={selectedAnswers[q.id] === option}
                            onChange={() => handleOptionChange(q.id, option)}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionSetting;
