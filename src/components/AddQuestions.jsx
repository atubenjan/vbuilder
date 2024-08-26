// src/components/AddQuestions.js
import React, { useState } from 'react';
import AddQuestionModal from './AddQuestionModal';

const AddQuestions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="w-full">
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Add Question
      </button>
      <AddQuestionModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default AddQuestions;
