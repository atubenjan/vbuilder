import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useProjects } from '../contexts/ProjectContext';

const AddQuestionToCourseModal = ({ isOpen, onClose, courseId }) => {
  const { questions, addQuestionToCourse } = useProjects(); // Assuming `questions` is provided
  const [selectedQuestionId, setSelectedQuestionId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionToAdd = questions.find((q) => q.id === selectedQuestionId);
    if (questionToAdd) {
      addQuestionToCourse(courseId, questionToAdd);
      setSelectedQuestionId(''); // Clear the selection
      onClose(); // Close the modal after submission
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Add Question to Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="question">
              Select Question
            </label>
            <select
              id="question"
              value={selectedQuestionId}
              onChange={(e) => setSelectedQuestionId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>
                Select a question
              </option>
              {questions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.question}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-4 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

AddQuestionToCourseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default AddQuestionToCourseModal;
