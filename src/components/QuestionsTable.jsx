import React, { useState } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import AddCourseToQuestionModal from './AddCourseToQuestionModal';

const QuestionsTable = () => {
  const { questions } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleAddCourseToQuestion = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 mt-4 bg-white rounded shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Questions List</h2>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Question</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-center border">{index + 1}</td>
                <td className="px-4 py-2 border">{question.text}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    onClick={() => handleAddCourseToQuestion(question)}
                  >
                    Add Course
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 text-center border" colSpan="3">
                No questions available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AddCourseToQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={selectedQuestion}
      />
    </div>
  );
};

export default QuestionsTable;
