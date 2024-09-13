import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Import axios for making HTTP requests

const QuizForm = ({ quiz, onSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptionChange = (questionIndex, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let totalScore = 0;
    let userScore = 0;

    quiz.questions.forEach((question, index) => {
      totalScore += question.Score;

      // Award the question's score if the answer is correct
      if (selectedAnswers[index] === question.CorrectAnswer) {
        userScore += question.Score;
      }
    });

    const userId = localStorage.getItem('userId');

    const resultData = {
      quizId: quiz.QuizId,
      score: userScore,
      totalScore: totalScore,
      userId: userId,
    };

    console.log(quiz.QuizId);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/quiz-results',
        resultData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Quiz results submitted successfully:', response.data);
      alert(`You scored ${userScore} out of ${totalScore} points!`);
      onSubmit();
    } catch (error) {
      console.error('Error submitting quiz results:', error);
      setError('Failed to submit quiz results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!quiz) {
    return <div>Loading quiz...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{quiz.title}</h2>
      {error && <p className="error">{error}</p>}
      {quiz.questions.map((question, index) => (
        <div key={index} className="pb-3">
          <p>
            {index + 1}. {question.Question}
          </p>
          {['OptionA', 'OptionB', 'OptionC', 'OptionD'].map((option) => (
            <div key={option} className="pl-3 py-2">
              <input
                type="radio"
                name={`question-${index}`}
                value={question[option]}
                onChange={() => handleOptionChange(index, question[option])}
                className="mr-2"
              />
              <label>{question[option]}</label>
            </div>
          ))}
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
        className="bg-button px-3 my-3 py-1 rounded-md"
      >
        {loading ? 'Submitting...' : 'Submit Quiz'}
      </button>
    </form>
  );
};

QuizForm.propTypes = {
  quiz: PropTypes.shape({
    QuizId: PropTypes.string.isRequired,
    title: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        Question: PropTypes.string.isRequired,
        OptionA: PropTypes.string.isRequired,
        OptionB: PropTypes.string.isRequired,
        OptionC: PropTypes.string.isRequired,
        OptionD: PropTypes.string.isRequired,
        CorrectAnswer: PropTypes.string.isRequired,
        Score: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuizForm;
