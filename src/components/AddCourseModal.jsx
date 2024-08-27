import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddCourseModal = ({ isOpen, onClose, onAddCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState(''); // Add description field

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (courseName.trim()) {
      try {
        // Make a POST request to the backend to create a new course
        const response = await axios.post('http://localhost:3000/courses', {
          name: courseName,
          description: description.trim() || null, // Include description
        });

        if (response.status === 201) {
          // Successfully added course, you can use the response data if needed
          onAddCourse(response.data); // Pass the newly added course to the parent component
        }
        // Clear form fields after submission
        setCourseName('');
        setDescription('');
        onClose();
      } catch (error) {
        console.error('Error creating course:', error);
      }
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
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="description">
              Course Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
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
