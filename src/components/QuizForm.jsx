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
      if (selectedAnswers[index] === question.CorrectAnswer) {
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
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="mb-3 text-xl font-semibold">{quiz.questions.Title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h4 className="mb-2">{question.Question}</h4>
            <div className="flex flex-col">
              <label className="mb-1">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={question.OptionA}
                  checked={selectedAnswers[index] === question.OptionA}
                  onChange={() => handleOptionChange(index, question.OptionA)}
                  className="mr-2"
                />
                {question.OptionA}
              </label>
              <label className="mb-1">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={question.OptionB}
                  checked={selectedAnswers[index] === question.OptionB}
                  onChange={() => handleOptionChange(index, question.OptionB)}
                  className="mr-2"
                />
                {question.OptionB}
              </label>
              <label className="mb-1">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={question.OptionC}
                  checked={selectedAnswers[index] === question.OptionC}
                  onChange={() => handleOptionChange(index, question.OptionC)}
                  className="mr-2"
                />
                {question.OptionC}
              </label>
              <label className="mb-1">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={question.OptionD}
                  checked={selectedAnswers[index] === question.OptionD}
                  onChange={() => handleOptionChange(index, question.OptionD)}
                  className="mr-2"
                />
                {question.OptionD}
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
