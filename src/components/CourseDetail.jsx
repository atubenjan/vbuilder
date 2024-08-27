import React from 'react';
import PropTypes from 'prop-types';

const CourseDetail = ({ course, onClose }) => {
  // Safeguard against undefined or null `course.questions`
  const questions = course?.questions || [];

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          Course Details: {course.name}
        </h2>
        <ul>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <li key={index} className="mb-2">
                <div className="font-semibold">{question.text}</div>
                <ul className="ml-4">
                  {question.answers.map((answer, idx) => (
                    <li key={idx}>
                      <input
                        type="checkbox"
                        disabled
                        checked={answer === question.correctAnswer}
                      />{' '}
                      {answer}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            <li>No questions available for this course.</li>
          )}
        </ul>
        <button
          onClick={onClose}
          className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

CourseDetail.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CourseDetail;
