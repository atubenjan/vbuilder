import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizForm from './QuizForm'; // Import the QuizForm component
import { FaTimes } from 'react-icons/fa';

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
    setSelectedQuiz(null); // Reset selected quiz after submission or closing
  };

  return (
    <div className="w-full">
      <h3 className="mb-2 text-lg font-semibold">All Quizzes</h3>
      <div className="flex flex-wrap w-full gap-4">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="p-2 mb-2 border border-gray-300 rounded-md"
          >
            <h4 className="pb-2 font-medium">{quiz.Title}</h4>
            <button
              className="px-4 py-2 text-white bg-gray-800 rounded-md"
              onClick={() => handleAttemptQuiz(quiz)}
            >
              Attempt Quiz
            </button>
          </div>
        ))}
      </div>

      {selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50">
          <div className="relative w-11/12 p-6 bg-white rounded-lg shadow-lg md:w-1/2">
            <button
              className="absolute text-red-600 top-2 right-2"
              onClick={() => handleQuizSubmit()}
            >
              <FaTimes />
            </button>
            <QuizForm quiz={selectedQuiz} onSubmit={handleQuizSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllQuestions;
