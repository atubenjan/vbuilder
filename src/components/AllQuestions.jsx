import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch all questions from the databsae
    const fetchAllQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/questions', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchAllQuestions();
  }, []);

  return (
    <div>
      <h2>All Questions</h2>
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <h3>{question.question_text}</h3>
              <p>Option A: {question.option_a}</p>
              <p>Option B: {question.option_b}</p>
              <p>Option C: {question.option_c}</p>
              <p>Option D: {question.option_d}</p>
              <p>Correct Answer: {question.correct_answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllQuestions;
