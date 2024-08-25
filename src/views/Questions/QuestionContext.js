import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const QuestionsContext = createContext()

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]) // Manage questions state
  const [selectedQuestions, setSelectedQuestions] = useState([])

  const addQuestion = (question) => {
    setQuestions((prev) => [...prev, question]) // Add new question
  }

  const addQuestionToSet = (question) => {
    setSelectedQuestions((prev) => [...prev, question])
  }

  const removeQuestionFromSet = (id) => {
    setSelectedQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  return (
    <QuestionsContext.Provider
      value={{ questions, addQuestion, selectedQuestions, addQuestionToSet, removeQuestionFromSet }}
    >
      {children}
    </QuestionsContext.Provider>
  )
}

QuestionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
