import React, { useState } from 'react';
import PropTypes from 'prop-types';

const QuizForm = ({ quiz, onSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionChange = (questionIndex, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correctCount++;
      }
    });

    alert(
      `You answered ${correctCount} out of ${quiz.questions.length} questions correctly!`,
    );

    onSubmit(); // Notify parent component that quiz submission is done
  };

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-semibold mb-4">{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h4 className="mb-2">{question.question_text}</h4>
            <div className="flex flex-col">
              {[
                question.option_a,
                question.option_b,
                question.option_c,
                question.option_d,
              ].map((option, optionIndex) => (
                <label key={optionIndex} className="mb-1">
                  <input
                    type="radio"
                    name={`question_${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

QuizForm.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question_text: PropTypes.string.isRequired,
        option_a: PropTypes.string.isRequired,
        option_b: PropTypes.string.isRequired,
        option_c: PropTypes.string.isRequired,
        option_d: PropTypes.string.isRequired,
        correct_answer: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuizForm;
