import React, { useState } from 'react';

export const sampleTrueFalse = [
  {
    id: 1,
    question: 'The Earth orbits the Sun.',
    correctAnswer: 'True',
  },
  {
    id: 2,
    question: 'Water boils at 90°C.',
    correctAnswer: 'False',
  },
];

const TrueFalsePage = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState({});

  const handleOptionChange = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
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
      <h1 className="mb-4 text-xl font-bold">True/False Questions</h1>
      <ul>
        {sampleTrueFalse.map((q) => (
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
              <div className="mt-2">
                <label className="block">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value="True"
                    checked={selectedAnswers[q.id] === 'True'}
                    onChange={() => handleOptionChange(q.id, 'True')}
                    className="mr-2"
                  />
                  True
                </label>
                <label className="block mt-1">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value="False"
                    checked={selectedAnswers[q.id] === 'False'}
                    onChange={() => handleOptionChange(q.id, 'False')}
                    className="mr-2"
                  />
                  False
                </label>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrueFalsePage;
