import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserCertification = () => {
  const [combinedResults, setCombinedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResultsAndDetails = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const resultsResponse = await axios.get(
          `http://localhost:5000/quiz-results/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const quizzes = await Promise.all(
          resultsResponse.data.map(async (result) => {
            const quizResponse = await axios.get(
              `http://localhost:5000/quizzes/${result.QuizId}`,
            );
            return {
              ...result,
              quizDetails: quizResponse.data,
            };
          }),
        );

        setCombinedResults(quizzes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz results and details:', error);
        setError('Failed to fetch quiz information. Please try again later.');
        setLoading(false);
      }
    };

    fetchResultsAndDetails();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderCombinedResults = () => {
    if (loading)
      return <p className="text-center">Loading certifications...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (combinedResults.length === 0)
      return <p className="text-center">No certifications available.</p>;

    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {combinedResults.map((result, index) => (
          <div
            key={index}
            className="mb-4 bg-white p-6 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">
              {result.quizDetails.Title}
            </h3>
            <p className="text-gray-600 mb-2">
              Completed on : {formatDate(result.CompletedAt)}
            </p>
            <p className="mb-2">
              Total Questions: {result.quizDetails.Questions.length}
            </p>
            <p className="text-lg font-semibold text-green-600">
              Score: {((result.Score / result.TotalScore) * 100).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderCombinedResults()}</div>;
};

export default UserCertification;
