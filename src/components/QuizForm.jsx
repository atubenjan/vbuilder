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

    onSubmit(); // Reset the selected quiz after submission
  };

  if (!quiz) {
    return <p>Loading quiz...</p>;
  }

  return (
    <div className="p-4 mt-4 border border-gray-300 rounded-md">
      <h2 className="mb-4 text-xl font-semibold">{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h4 className="mb-2">{question.question_text}</h4>
            <div className="flex flex-col">
              <label className="mb-1">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={question.option_a}
                  checked={selectedAnswers[index] === question.option_a}
                  onChange={() => handleOptionChange(index, question.option_a)}
                  className="mr-2"
                />
                {question.option_a}
              </label>
              <label className="mb-1">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={question.option_b}
                  checked={selectedAnswers[index] === question.option_b}
                  onChange={() => handleOptionChange(index, question.option_b)}
                  className="mr-2"
                />
                {question.option_b}
              </label>
              <label className="mb-1">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={question.option_c}
                  checked={selectedAnswers[index] === question.option_c}
                  onChange={() => handleOptionChange(index, question.option_c)}
                  className="mr-2"
                />
                {question.option_c}
              </label>
              <label className="mb-1">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={question.option_d}
                  checked={selectedAnswers[index] === question.option_d}
                  onChange={() => handleOptionChange(index, question.option_d)}
                  className="mr-2"
                />
                {question.option_d}
              </label>
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
