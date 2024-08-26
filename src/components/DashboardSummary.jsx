// src/components/DashboardSummary.js
import React from 'react';
import { useProjects } from '../contexts/ProjectContext';

const DashboardSummary = () => {
  const { questions, users, organizations, courses } = useProjects();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col justify-between p-4 text-white rounded shadow-md bg-sky-800">
        <h3 className="mb-2 text-xl font-semibold">Total Questions</h3>
        <p className="text-2xl">{questions.length}</p>
      </div>
      <div className="p-4 text-white bg-gray-700 rounded shadow-md">
        <h3 className="mb-2 text-xl font-semibold">Total Users</h3>
        <p className="text-2xl">{users.length}</p>
      </div>
      <div className="p-4 text-white rounded shadow-md bg-zinc-700">
        <h3 className="mb-2 text-xl font-semibold">Total Organizations</h3>
        <p className="text-2xl">{organizations.length}</p>
      </div>
      <div className="p-4 text-white rounded shadow-md bg-neutral-700">
        <h3 className="mb-2 text-xl font-semibold">Total Courses</h3>
        <p className="text-2xl">{courses.length}</p>
      </div>
    </div>
  );
};

export default DashboardSummary;
