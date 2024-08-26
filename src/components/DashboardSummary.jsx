// src/components/DashboardSummary.js
import React from 'react';
import { useProjects } from '../contexts/ProjectContext';

const DashboardSummary = () => {
  const { questions, users, organizations, courses } = useProjects();

  return (
    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="p-4 text-black bg-white rounded shadow-md">
        <h3 className="mb-2 text-xl font-semibold">Total Questions</h3>
        <p className="text-2xl">{questions.length}</p>
      </div>
      <div className="p-4 text-black bg-white rounded shadow-md">
        <h3 className="mb-2 text-xl font-semibold">Total Users</h3>
        <p className="text-2xl">{users.length}</p>
      </div>
      <div className="p-4 text-black bg-white rounded shadow-md">
        <h3 className="mb-2 text-xl font-semibold">Total Organizations</h3>
        <p className="text-2xl">{organizations.length}</p>
      </div>
      <div className="p-4 text-black bg-white rounded shadow-md">
        <h3 className="mb-2 text-xl font-semibold">Total Courses</h3>
        <p className="text-2xl">{courses.length}</p>
      </div>
    </div>
  );
};

export default DashboardSummary;
