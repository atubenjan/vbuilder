import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'

const Users = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      answer: 'Paris',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Mars',
    },
    {
      id: 3,
      question: 'Who wrote "Hamlet"?',
      options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Mark Twain'],
      answer: 'William Shakespeare',
    },
  ])

  const [visible, setVisible] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [newOptions, setNewOptions] = useState(['', '', '', ''])
  const [newAnswer, setNewAnswer] = useState('')

  const toggleQuestion = (id) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((questionId) => questionId !== id)
        : [...prevSelected, id],
    )
  }

  const handleAddQuestion = () => {
    const newId = questions.length + 1
    const newQuestionObj = {
      id: newId,
      question: newQuestion,
      options: newOptions,
      answer: newAnswer,
    }
    setQuestions([...questions, newQuestionObj])

    // Reset the form fields
    setNewQuestion('')
    setNewOptions(['', '', '', ''])
    setNewAnswer('')

    // Close the modal after submission
    setVisible(false)
  }

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions]
    updatedOptions[index] = value
    setNewOptions(updatedOptions)
  }

  return (
    <>
      <CButton color="success" onClick={() => setVisible(true)} className="mb-4">
        Add New Question
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add New Question</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel htmlFor="question">Question</CFormLabel>
          <CFormInput
            id="question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter the question"
          />
          {newOptions.map((option, index) => (
            <div key={index}>
              <CFormLabel htmlFor={`option-${index}`}>Option {index + 1}</CFormLabel>
              <CFormInput
                id={`option-${index}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Enter option ${index + 1}`}
              />
            </div>
          ))}
          <CFormLabel htmlFor="answer">Correct Answer</CFormLabel>
          <CFormInput
            id="answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Enter the correct answer"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddQuestion}>
            Add Question
          </CButton>
        </CModalFooter>
      </CModal>

      <CRow>
        {questions.map((q) => (
          <CCol xs={12} key={q.id}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>{q.question}</strong>
              </CCardHeader>
              <CCardBody>
                {q.options.map((option, index) => (
                  <CFormCheck
                    key={index}
                    type="radio"
                    name={`question-${q.id}`}
                    id={`option-${q.id}-${index}`}
                    label={option}
                    disabled
                    checked={option === q.answer}
                  />
                ))}
                <CButton
                  color={selectedQuestions.includes(q.id) ? 'danger' : 'primary'}
                  onClick={() => toggleQuestion(q.id)}
                >
                  {selectedQuestions.includes(q.id) ? 'Remove' : 'Add'}
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default Users
