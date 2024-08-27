import React, { useState } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import AddCourseModal from './AddCourseModal';
import AddQuestionToCourseModal from './AddQuestionToCourseModal';
import CourseDetail from './CourseDetail';

const CourseContent = () => {
  const { courses, addCourse, addQuestionToCourse } = useProjects();
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isCourseDetailOpen, setIsCourseDetailOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleAddCourse = (name) => {
    addCourse({ id: Date.now().toString(), name, questions: [] });
  };

  const handleAddQuestionToCourse = (question) => {
    if (selectedCourse) {
      addQuestionToCourse(selectedCourse.id, question);
      setIsQuestionModalOpen(false);
    }
  };

  const handleViewCourseDetail = (course) => {
    setSelectedCourse(course);
    setIsCourseDetailOpen(true);
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

      {courses.map((course) => (
        <div key={course.id} className="p-4 my-4 bg-white rounded shadow-md">
          <h3 className="mb-2 text-xl font-semibold">{course.name}</h3>
          <button
            onClick={() => {
              setSelectedCourse(course);
              setIsQuestionModalOpen(true);
            }}
            className="px-4 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Question
          </button>

          <button
            onClick={() => handleViewCourseDetail(course)}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            View Course Details
          </button>
        </div>
      ))}

      {selectedCourse && (
        <>
          <AddQuestionToCourseModal
            isOpen={isQuestionModalOpen}
            onClose={() => setIsQuestionModalOpen(false)}
            courseId={selectedCourse.id}
            onAddQuestionToCourse={handleAddQuestionToCourse}
          />
          {isCourseDetailOpen && (
            <CourseDetail
              course={selectedCourse}
              onClose={() => setIsCourseDetailOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CourseContent;
