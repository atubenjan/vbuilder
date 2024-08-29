import React, { useState } from 'react';

export const  sampleMCQs = [
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

const MCQPage = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState({});

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

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Multiple Choice Questions</h1>
      <ul>
        {sampleMCQs.map((q) => (
          <li
            key={q.id}
            className={`p-4 mb-4 border border-gray-300 rounded ${isQuestionSelected(q.id) ? 'bg-gray-100' : ''}`}
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
  );
};

export default MCQPage;
