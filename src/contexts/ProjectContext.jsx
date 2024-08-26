// src/contexts/ProjectContext.js
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [courses, setCourses] = useState([]);

  const addQuestion = (questionData) => {
    setQuestions((prevQuestions) => [...prevQuestions, questionData]);
  };

  const addUser = (userData) => {
    setUsers((prevUsers) => [...prevUsers, userData]);
  };

  const addOrganization = (organizationData) => {
    setOrganizations((prevOrganizations) => [
      ...prevOrganizations,
      organizationData,
    ]);
  };

  const addCourse = (courseData) => {
    setCourses((prevCourses) => [...prevCourses, courseData]);
  };

  const addQuestionToCourse = (courseName, questionText) => {
    setCourses((prevCourses) => {
      return prevCourses.map((course) =>
        course.name === courseName
          ? { ...course, questions: [...course.questions, questionText] }
          : course,
      );
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        questions,
        users,
        organizations,
        courses,
        addQuestion,
        addUser,
        addOrganization,
        addCourse,
        addQuestionToCourse,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useProjects = () => useContext(ProjectContext);
