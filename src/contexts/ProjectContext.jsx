import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid'; // Install this package for unique IDs

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [courses, setCourses] = useState([]);

  // Function to add a question with all necessary details
  const addQuestion = (question, answers, correctAnswer) => {
    const newQuestion = {
      id: uuidv4(),
      question,
      answers, // array of possible answers
      correctAnswer, // the correct answer
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  // Function to add a new course
  const addCourse = (courseName) => {
    const newCourse = {
      id: uuidv4(),
      courseName,
      questions: [], // Start with no questions initially
    };
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  // Function to add a question to a specific course
  const addQuestionToCourse = (courseId, question) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, questions: [...course.questions, question] }
          : course,
      ),
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        questions,
        users,
        organizations,
        courses,
        addQuestion,
        addUser: (userData) =>
          setUsers((prevUsers) => [...prevUsers, userData]),
        addOrganization: (organizationData) =>
          setOrganizations((prevOrganizations) => [
            ...prevOrganizations,
            organizationData,
          ]),
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
