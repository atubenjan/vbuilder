// src/components/QuestionsTable.js
import React from 'react';
import { useProjects } from '../contexts/ProjectContext';

const QuestionsTable = () => {
  const { questions } = useProjects();

  return (
    <div className="p-4 mt-4 bg-white rounded shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Questions List</h2>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Question Text</th>
          </tr>
        </thead>
        <tbody>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-center border">{index + 1}</td>
                <td className="px-4 py-2 border">{question.text}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 text-center border" colSpan="2">
                No questions available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsTable;
