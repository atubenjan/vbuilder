// src/components/QuestionContent.js
import React, { useState } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import AddCourseModal from './AddCourseModal';
import AddQuestionToCourseModal from './AddQuestionToCourseModal';

const QuestionContent = () => {
  const { courses, addCourse, addQuestionToCourse } = useProjects();
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleAddCourse = (name) => {
    addCourse({ name, questions: [] });
  };

  const handleAddQuestionToCourse = (question) => {
    if (selectedCourse) {
      addQuestionToCourse(selectedCourse.name, question);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsCourseModalOpen(true)}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Add Course
      </button>
      <AddCourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onAddCourse={handleAddCourse}
      />

      {courses.map((course, index) => (
        <div key={index} className="p-4 my-4 bg-white rounded shadow-md">
          <h3 className="mb-2 text-xl font-semibold">{course.name}</h3>
          <button
            onClick={() => {
              setSelectedCourse(course);
              setIsQuestionModalOpen(true);
            }}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>
      ))}

      {selectedCourse && (
        <AddQuestionToCourseModal
          isOpen={isQuestionModalOpen}
          onClose={() => setIsQuestionModalOpen(false)}
          course={selectedCourse}
          onAddQuestionToCourse={handleAddQuestionToCourse}
        />
      )}
    </div>
  );
};

export default QuestionContent;
