import React, { useContext } from 'react'
import { QuestionsContext } from './QuestionContext'
import { CCard, CCardBody, CCardHeader, CButton, CListGroup, CListGroupItem } from '@coreui/react'

const Questions = () => {
  const { questions = [], toggleQuestion, selectedQuestions } = useContext(QuestionsContext)

  return (
    <div>
      {questions.map((question) => (
        <CCard key={question.id} className="mb-3">
          <CCardHeader>
            <h5>{question.question}</h5>
          </CCardHeader>
          <CCardBody>
            <CListGroup>
              {question.options.map((option, index) => (
                <CListGroupItem key={index}>{option}</CListGroupItem>
              ))}
            </CListGroup>
            <div className="mt-3">
              <CButton
                color={selectedQuestions.includes(question.id) ? 'danger' : 'primary'}
                onClick={() => toggleQuestion(question.id)}
              >
                {selectedQuestions.includes(question.id) ? 'Remove from list' : 'Add to list'}
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      ))}
    </div>
  )
}

export default Questions
