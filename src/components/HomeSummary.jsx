import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaQuestionCircle, FaUsers } from 'react-icons/fa';
import { MdQuiz } from 'react-icons/md';
import { PiCertificateBold } from 'react-icons/pi';

const HomeSummary = () => {
  const [users, setUsers] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [completedQuiz, setCompletedQuiz] = useState([]);
  const [quizResults, setQuizResults] = useState([]);

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const organization = localStorage.getItem('organization'); // For organization role
        const response = await axios.get('http://localhost:5000/users', {
          headers: { Authorization: `Bearer ${token}` },
          params: { organization }, // Send organization param if needed
        });

        // Set the user count based on the number of users retrieved
        setUsers(response.data.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/quizzes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/questions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const fetchQuizCompleted = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/quiz-results/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setCompletedQuiz(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuizCompleted();
  }, []);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/quiz-results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizResults(response.data);
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }
    };

    fetchQuizResult();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start w-full h-full gap-2 px-3 my-4">
      <div className="flex flex-col items-stretch justify-between w-full h-fulfitl p-4 text-white border border-gray-400 rounded-lg bg-background ">
        <div className="flex justify-between pb-7 w-full">
          <span className="text-3xl text-icon">
            <FaUsers />
          </span>
          <span className="text-3xl text-right">{users}</span>
        </div>
        <span className="text-lg">Total Users</span>
      </div>
      <div className="flex flex-col items-stretch justify-between w-full h-fulfitl p-4 text-white border border-gray-400 rounded-lg bg-background ">
        <div className="flex justify-between pb-7 w-full">
          <span className="text-3xl text-icon">
            <FaQuestionCircle />
          </span>
          <span className="text-3xl text-right">{questions.length}</span>
        </div>
        <span className="text-lg">Total Questions</span>
      </div>
      <div className="flex flex-col items-stretch justify-between w-full h-fit p-4 text-white border border-gray-400 rounded-lg bg-background ">
        <div className="flex justify-between pb-7 w-full">
          <span className="text-3xl text-icon">
            <MdQuiz />
          </span>
          <span className="text-3xl text-right">{quizzes.length}</span>
        </div>
        <div className="text-lg">Quizzes Available</div>
      </div>
      <div className="flex flex-col items-stretch justify-between w-full h-fit p-4 text-white border border-gray-400 rounded-lg bg-background ">
        <div className="flex justify-between pb-7 w-full">
          <span className="text-3xl text-icon">
            <PiCertificateBold />
          </span>
          <span className="text-3xl text-right">{quizResults.length}</span>
        </div>
        <div className="text-lg">Quiz Attempted</div>
      </div>
      {role === 'user' && (
        <div className="flex flex-col items-stretch justify-between w-full h-fit p-4 text-white border border-background rounded-lg bg-background ">
          <div className="flex justify-between pb-7 w-full">
            <span className="text-3xl text-icon">
              <PiCertificateBold />
            </span>
            <span className="text-3xl text-right">{completedQuiz.length}</span>
          </div>
          <div className="text-lg">Your Certificates</div>
        </div>
      )}
    </div>
  );
};

export default HomeSummary;
