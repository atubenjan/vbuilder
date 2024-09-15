import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCertifications = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [quizDetails, setQuizDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const resultsResponse = await axios.get(
          'http://localhost:5000/quiz-results',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const results = resultsResponse.data;
        setQuizResults(results);

        // Fetch quiz titles based on QuizId
        const quizDetailsPromises = results.map(async (result) => {
          try {
            const quizResponse = await axios.get(
              `http://localhost:5000/quizzes/${result.QuizId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
            return { quizId: result.QuizId, title: quizResponse.data.Title };
          } catch (error) {
            console.error(
              `Error fetching quiz details for ID ${result.QuizId}:`,
              error,
            );
            return { quizId: result.QuizId, title: 'Error fetching title' };
          }
        });

        // Fetch user details based on UserId
        const userDetailsPromises = results.map(async (result) => {
          try {
            const userResponse = await axios.get(
              `http://localhost:5000/users/${result.UserId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
            return { userId: result.UserId, name: userResponse.data.Username }; // Assuming user name is Username
          } catch (error) {
            console.error(
              `Error fetching user details for ID ${result.UserId}:`,
              error,
            );
            return { userId: result.UserId, name: 'Error fetching name' };
          }
        });

        // Resolve all promises
        const quizDetailsArray = await Promise.all(quizDetailsPromises);
        const userDetailsArray = await Promise.all(userDetailsPromises);

        // Map quiz and user details to their corresponding IDs
        const detailsMap = quizDetailsArray.reduce((acc, quiz) => {
          acc[quiz.quizId] = quiz.title;
          return acc;
        }, {});

        const userMap = userDetailsArray.reduce((acc, user) => {
          acc[user.userId] = user.name;
          return acc;
        }, {});

        setQuizDetails(detailsMap);
        setUserDetails(userMap);
      } catch (error) {
        console.error(
          'Error fetching quiz results, details, or user information:',
          error,
        );
      }
    };
    fetchQuizResults();
  }, []);

  return (
    <div className="w-full">
      {quizResults.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quizResults.map((result) => (
            <div
              key={result.ResultId}
              className="quiz-result-card bg-gray-100 p-4 mb-4 rounded shadow"
            >
              <h3 className="text-lg font-semibold mb-2">
                {quizDetails[result.QuizId] || 'Loading quiz title...'}
              </h3>
              <p className="capitalize">
                <strong>User:</strong>{' '}
                {userDetails[result.UserId] || 'Loading user name...'}
              </p>
              <p>
                <strong>Score:</strong>{' '}
                {(result.Score / result.TotalScore) * 100} %
              </p>
              <p>
                <strong>Completed At:</strong>{' '}
                {new Date(result.CompletedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No quiz results found.</p>
      )}
    </div>
  );
};

export default AdminCertifications;
