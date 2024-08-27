import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useProjects } from '../contexts/ProjectContext';

const AddCourseToQuestionModal = ({ isOpen, onClose, question }) => {
  const { courses, addQuestionToCourse } = useProjects();
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCourseId && question) {
      addQuestionToCourse(selectedCourseId, question);
      onClose();
    }
  };

  // Ensure question is not null before rendering the modal
  if (!question) return null;

  return isOpen ? (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-700 bg-opacity-50">
      <div className="w-full max-w-md p-6 mt-12 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Add Course to Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="course">
              Select Course
            </label>
            <select
              id="course"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
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
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

AddCourseToQuestionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  question: PropTypes.object,
};

export default AddCourseToQuestionModal;
