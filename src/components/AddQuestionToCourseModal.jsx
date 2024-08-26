import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useProjects } from '../contexts/ProjectContext';

const AddQuestionToCourseModal = ({ isOpen, onClose, course, onAddQuestionToCourse }) => {
  const { questions } = useProjects();
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedQuestion) {
      // Pass the selected question text to onAddQuestionToCourse
      onAddQuestionToCourse(selectedQuestion);
      setSelectedQuestion('');
      onClose();
    }
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-700 bg-opacity-50">
        <div className="w-full max-w-md p-6 mt-12 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Add Question to {course.name}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700" htmlFor="question">
                Select Question
              </label>
              <select
                id="question"
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="" disabled>Select a question</option>
                {questions.map((question, index) => (
                  <option key={index} value={question.text}>
                    {question.text}
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
    ) : null
  );
};

AddQuestionToCourseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  onAddQuestionToCourse: PropTypes.func.isRequired,
};

export default AddQuestionToCourseModal;
