import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizForm from './QuizForm';
import { FaTimes, FaTrash } from 'react-icons/fa';

const AllQuestions = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const role = localStorage.getItem('role');

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

  const handleAttemptQuiz = async (quiz) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const selectedQuizId = quiz.QuizId;

    if (!token) {
      console.error('No token found. Please log in again.');
      alert('You need to log in to attempt quizzes.');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/quiz-results/check/${selectedQuizId}/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.completed) {
        setCompletedQuizzes((prevState) => ({
          ...prevState,
          [selectedQuizId]: true,
        }));
        alert('You have already completed this quiz.');
      } else {
        setSelectedQuiz(quiz);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized access. Please log in again.');
        console.error('Unauthorized error:', error);
      } else {
        console.error('Error checking quiz completion:', error);
      }
    }
  };

  const handleQuizSubmit = (quizId) => {
    // Mark the current quiz as completed
    setCompletedQuizzes((prevState) => ({
      ...prevState,
      [quizId]: true,
    }));
    setSelectedQuiz(null); // Reset after submission
  };

  const calculateTotalScore = (questions) => {
    return questions.reduce(
      (total, question) => total + (question.Score || 0),
      0,
    );
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to delete a quiz.');
        return;
      }

      try {
        await axios.delete(`http://localhost:5000/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz.QuizId !== quizId),
        );
        alert('Quiz deleted successfully.');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Failed to delete quiz.');
      }
    }
  };

  return (
    <div className="w-full">
      <h3 className="mb-2 text-lg font-semibold">All Quizzes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between items-start w-full gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.QuizId}
            className="p-2 mb-2 border grid-cols-1 border-gray-300 rounded-md"
          >
            <h4 className="pb-2 font-medium">{quiz.Title} Quiz</h4>
            <p className="pb-2 text-sm text-gray-600">
              Total Marks: {calculateTotalScore(quiz.questions)}
            </p>
            <p className="pb-2 text-sm text-gray-600">
              {quiz.questions.length} Questions
            </p>
            <div className="w-full flex justify-between items-center">
              <button
                className="px-4 py-1 mr-2 text-white bg-button rounded-md"
                onClick={() => handleAttemptQuiz(quiz)}
              >
                {completedQuizzes[quiz.QuizId]
                  ? 'Quiz Completed'
                  : 'Start Quiz'}
              </button>
              {role === 'admin' && (
                <button
                  className="px-2 py-1 text-white bg-red-600 rounded-md"
                  onClick={() => handleDeleteQuiz(quiz.QuizId)}
                >
                  <div className="flex justify-around  items-center">
                    <span>
                      <FaTrash />
                    </span>
                    <span className="pl-1">Delete</span>
                  </div>
                </button>
              )}
              {role === 'organization' && (
                <button
                  className="px-2 py-1 text-white bg-red-600 rounded-md"
                  onClick={() => handleDeleteQuiz(quiz.QuizId)}
                >
                  <div className="flex justify-around  items-center">
                    <span>
                      <FaTrash />
                    </span>
                    <span className="pl-1">Delete</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full overflow-y-auto bg-black bg-opacity-50">
          <div className="relative w-11/12 p-5 mt-32 bg-white rounded-lg shadow-lg md:w-1/2">
            <div className="flex justify-between w-full">
              <h2 className="pb-5 text-2xl">{selectedQuiz.Title}</h2>
              <button
                className="absolute text-red-600 top-5 right-4"
                onClick={() => setSelectedQuiz(null)}
              >
                <FaTimes />
              </button>
            </div>
            <QuizForm
              quiz={selectedQuiz}
              onSubmit={() => handleQuizSubmit(selectedQuiz.QuizId)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllQuestions;
