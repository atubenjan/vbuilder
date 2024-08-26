// src/components/AddCourseModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddCourseModal = ({ isOpen, onClose, onAddCourse }) => {
  const [courseName, setCourseName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (courseName.trim()) {
      onAddCourse(courseName);
      setCourseName('');
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-700 bg-opacity-50">
      <div className="w-full max-w-md p-6 mt-12 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="courseName">
              Course Name
            </label>
            <input
              id="courseName"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
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

AddCourseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddCourse: PropTypes.func.isRequired,
};

export default AddCourseModal;
