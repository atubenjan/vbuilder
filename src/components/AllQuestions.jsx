import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QuizForm from './QuizForm'; // Import the new QuizForm component

const AllQuestions = ({ quizzes }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleAttemptQuiz = (quiz) => {
    setSelectedQuiz(quiz); // Set the selected quiz to be attempted
  };

  const handleQuizSubmit = () => {
    setSelectedQuiz(null); // Reset selected quiz after submission
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">All Quizzes</h3>
      {quizzes.map((quiz, index) => (
        <div key={index} className="mb-4 p-3 border border-gray-300 rounded-md">
          <h4 className="font-medium">{quiz.title}</h4>
          <p>{quiz.questions.length} Questions</p>
          <button
            className="px-4 py-2 text-white bg-gray-800 rounded-md"
            onClick={() => handleAttemptQuiz(quiz)}
          >
            Attempt Quiz
          </button>
        </div>
      ))}

      {selectedQuiz && (
        <QuizForm quiz={selectedQuiz} onSubmit={handleQuizSubmit} />
      )}
    </div>
  );
};

AllQuestions.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};

export default AllQuestions;
