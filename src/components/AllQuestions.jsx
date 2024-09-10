import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizForm from './QuizForm'; // Import the QuizForm component

const AllQuestions = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleAttemptQuiz = (quiz) => {
    setSelectedQuiz(quiz); // Set the selected quiz to be attempted
  };

  const handleQuizSubmit = () => {
    setSelectedQuiz(null); // Reset selected quiz after submission
  };

  return (
    <div className="mt-4">
      <h3 className="mb-4 text-lg font-semibold">All Quizzes</h3>
      {quizzes.map((quiz, index) => (
        <div key={index} className="p-3 mb-4 border border-gray-300 rounded-md">
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

export default AllQuestions;
