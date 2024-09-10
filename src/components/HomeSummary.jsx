import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const HomeSummary = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);

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
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);
  return (
    <div className="flex flex-col items-stretch justify-between w-full h-full gap-2 mt-5">
      <div className="flex flex-col items-stretch justify-between w-full h-full p-4 text-white border border-gray-400 rounded-lg bg-slate-800 ">
        <div className="flex justify-between w-full">
          <span className="text-4xl">
            <FaQuestionCircle />
          </span>
          <span className="text-lg">Questions</span>
        </div>
        <div className="text-4xl text-right">{questions.length}</div>
      </div>
      <div className="flex flex-col items-stretch justify-between w-full h-full p-4 text-white border border-gray-400 rounded-lg bg-slate-800 ">
        <div className="flex justify-between w-full">
          <span className="text-4xl">
            <FaQuestionCircle />
          </span>
          <span className="text-lg">Quizzes</span>
        </div>
        <div className="text-4xl text-right">{quizzes.length}</div>
      </div>
    </div>
  );
};

export default HomeSummary;
