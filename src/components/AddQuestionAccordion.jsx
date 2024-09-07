import React, { useState } from 'react';
import axios from 'axios';
import QuestionTypeDropDown from './QuestionTypeDropDown';

const AddQuestionAccordion = () => {
  const [questionType, setQuestionType] = useState('');
  const [numQuestionsInput, setNumQuestionsInput] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isReviewStep, setIsReviewStep] = useState(false);

  const [questionData, setQuestionData] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
    case_study_description: '',
    project_description: '',
  });

  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
  };


  const questionTypes = [
    { value: 'single', label: 'Single Choice' },
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'truefalse', label: 'True/False' },
    { value: 'essay', label: 'Essay' },
    { value: 'short_answers', label: 'Short Answers' },
    { value: 'case_study', label: 'Case Study' },
    { value: 'project_based_assignment', label: 'Project Based Assignments' },
  ];

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveQuestion = () => {
    // Basic validation
    if (
      !questionData.question_text ||
      (questionType === 'single' && !questionData.option_a) ||
      (questionType === 'mcq' &&
        (!questionData.option_a ||
          !questionData.option_b ||
          !questionData.option_c ||
          !questionData.option_d))
    ) {
      alert('Please fill all required fields.');
      return;
    }

    setQuestions([...questions, questionData]);

    setQuestionData({
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: '',
      case_study_description: '',
      project_description: '',
    });

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex + 1 >= numQuestions) {
      setIsReviewStep(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/save-questions', { questions })
      .then((response) => {
        console.log('Questions added successfully:', response.data);
        alert('Questions added successfully');
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setNumQuestions('');
        setIsReviewStep(false);
      })
      .catch((error) => {
        console.error('There was an error adding the questions:', error);
      });
  };

  const handleNumQuestionsConfirm = () => {
    if (isNaN(numQuestionsInput) || numQuestionsInput <= 0) {
      alert('Please enter a valid number.');
      return;
    }
    setNumQuestions(numQuestionsInput);
  };

  const downloadQuestions = () => {
    const blob = new Blob([JSON.stringify(questions, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleGoBack = () => {
    setIsReviewStep(false);
    setQuestionType('');
    setNumQuestions('');
    setCurrentQuestionIndex(0);
    setQuestions([]);
  };

  return (
    <div className="w-full">
      {!questionType && (
        <QuestionTypeDropDown
          options={questionTypes}
          value={questionType}
          onChange={handleQuestionTypeChange}
        />
      )}

      {questionType && numQuestions === '' && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Number of Questions:
          </label>
          <input
            type="number"
            value={numQuestionsInput}
            onChange={(e) => setNumQuestionsInput(e.target.value)}
            className="w-full p-2 mb-4 outline-none border border-gray-300 rounded-md"
            placeholder="Enter number of questions"
          />
          <button
            type="button"
            onClick={handleNumQuestionsConfirm}
            className="px-4 py-2 text-white bg-gray-800 rounded-md"
          >
            Next
          </button>
        </div>
      )}

      {questionType &&
        numQuestions > 0 &&
        currentQuestionIndex < numQuestions &&
        !isReviewStep && (
          <div className="p-5 border border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Question {currentQuestionIndex + 1}:
              </label>
              <input
                type="text"
                name="question_text"
                value={questionData.question_text}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />

              {questionType === 'single' || questionType === 'mcq' ? (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Options:
                  </label>
                  <input
                    type="text"
                    name="option_a"
                    value={questionData.option_a}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    placeholder="Option 1"
                  />
                  <input
                    type="text"
                    name="option_b"
                    value={questionData.option_b}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    placeholder="Option 2"
                  />
                  {questionType === 'mcq' && (
                    <>
                      <input
                        type="text"
                        name="option_c"
                        value={questionData.option_c}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        placeholder="Option 3"
                      />
                      <input
                        type="text"
                        name="option_d"
                        value={questionData.option_d}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        placeholder="Option 4"
                      />
                    </>
                  )}
                  <input
                    type="text"
                    name="correct_answer"
                    value={questionData.correct_answer}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    placeholder="Correct Answer"
                  />
                </>
              ) : null}

              {questionType === 'truefalse' && (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Choose True or False:
                  </label>
                  <select
                    name="correct_answer"
                    value={questionData.correct_answer}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Answer</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </>
              )}

              {questionType === 'essay' && (
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Essay Answer (will be evaluated manually):
                </label>
              )}

              {questionType === 'short_answers' && (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Short Answers:
                  </label>
                  <input
                    type="text"
                    name="short_answers"
                    value={questionData.short_answers}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    placeholder="Enter short answers"
                  />
                </>
              )}

              {questionType === 'case_study' && (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Case Study Description:
                  </label>
                  <textarea
                    name="case_study_description"
                    value={questionData.case_study_description}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    rows="4"
                    placeholder="Enter case study description"
                  />
                </>
              )}

              {questionType === 'project_based_assignment' && (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Project Description:
                  </label>
                  <textarea
                    name="project_description"
                    value={questionData.project_description}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    rows="4"
                    placeholder="Enter project description"
                  />
                </>
              )}

              <button
                type="button"
                onClick={handleSaveQuestion}
                className="px-4 py-2 text-white bg-gray-800 rounded-md"
              >
                Save Question
              </button>
            </form>
          </div>
        )}

      {isReviewStep && (
        <div className="p-5 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Review Questions</h3>
          {questions.map((q, index) => (
            <div
              key={index}
              className="mb-4 p-3 border border-gray-300 rounded-md"
            >
              <h4 className="font-medium">Question {index + 1}:</h4>
              <p>{q.question_text}</p>
              {q.option_a && <p>A: {q.option_a}</p>}
              {q.option_b && <p>B: {q.option_b}</p>}
              {q.option_c && <p>C: {q.option_c}</p>}
              {q.option_d && <p>D: {q.option_d}</p>}
              {q.correct_answer && <p>Correct Answer: {q.correct_answer}</p>}
              {q.case_study_description && (
                <p>Case Study: {q.case_study_description}</p>
              )}
              {q.project_description && <p>Project: {q.project_description}</p>}
            </div>
          ))}
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-gray-800 rounded-md mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={downloadQuestions}
            className="px-4 py-2 text-white bg-gray-800 rounded-md mr-2"
          >
            Download JSON
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="px-4 py-2 text-white bg-gray-800 rounded-md"
          >
            Go Back to Step 1
          </button>
        </div>
      )}
    </div>
  );
};

export default AddQuestionAccordion;
