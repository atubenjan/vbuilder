import React, { useState, useContext } from 'react'
import { QuestionsContext } from '../Questions/QuestionContext'
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'

const Users = () => {
  const { addQuestion } = useContext(QuestionsContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [answer, setAnswer] = useState('')

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newQuestion = {
      id: Date.now(),
      question,
      options,
      answer,
    }
    addQuestion(newQuestion)
    // Clear the form after submission
    setQuestion('')
    setOptions(['', '', '', ''])
    setAnswer('')
    // Close the modal after submission
    setIsModalOpen(false)
  }

  return (
    <div>
      {/* Button to open modal */}
      <CButton color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Question
      </CButton>

      {/* Modal */}
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Add New Question</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="question">Question:</CFormLabel>
              <CFormInput
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="options">Options:</CFormLabel>
              {options.map((option, index) => (
                <div key={index} className="mb-2">
                  <CFormInput
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="answer">Answer:</CFormLabel>
              <CFormInput
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <CButton type="submit" color="primary">
              Add Question
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Users
