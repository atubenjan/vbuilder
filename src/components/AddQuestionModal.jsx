// src/components/AddQuestionModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useProjects } from '../contexts/ProjectContext';

const AddQuestionModal = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const { addQuestion } = useProjects();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionData = { text: question, options, correctAnswer };
    addQuestion(questionData);

    // Clear form fields
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');

    // Close the modal after submission
    onClose();
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 z-10 flex items-start justify-center overflow-y-auto bg-gray-700 bg-opacity-50">
        <div className="w-11/12 max-w-lg p-6 mt-12 bg-white rounded-lg shadow-lg md:w-full">
          <h2 className="mb-4 text-2xl font-bold">Add New Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700" htmlFor="question">
                Question
              </label>
              <input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {options.map((option, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2 text-gray-700" htmlFor={`option${index}`}>
                  Option {index + 1}
                </label>
                <input
                  id={`option${index}`}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700" htmlFor="correctAnswer">
                Correct Answer
              </label>
              <select
                id="correctAnswer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="" disabled>Select correct answer</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
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

AddQuestionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddQuestionModal;
