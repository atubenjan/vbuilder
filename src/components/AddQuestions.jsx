import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddQuestions = ({ addQuizToAllQuestions }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [numQuestionsInput, setNumQuestionsInput] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isReviewStep, setIsReviewStep] = useState(false);
  const [showNumQuestionsInput, setShowNumQuestionsInput] = useState(false);

  const [questionData, setQuestionData] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
  });

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveQuestion = () => {
    if (
      !questionData.question_text ||
      !questionData.option_a ||
      !questionData.option_b ||
      !questionData.option_c ||
      !questionData.option_d ||
      !questionData.correct_answer
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
    });

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex + 1 >= numQuestions) {
      setIsReviewStep(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Directly send data to AllQuestions component
    addQuizToAllQuestions({ title: quizTitle, questions });

    // Reset state after submission
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setNumQuestions('');
    setQuizTitle('');
    setIsReviewStep(false);
    setShowNumQuestionsInput(false);
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
    setNumQuestions('');
    setCurrentQuestionIndex(0);
    setQuestions([]);
  };

  const handleTitleNext = () => {
    setShowNumQuestionsInput(true);
  };

  return (
    <div className="w-full">
      {/* Quiz Title Input */}
      {!showNumQuestionsInput && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Add MCQs Title:
          </label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full p-2 mb-4 outline-none border border-gray-300 rounded-md"
            placeholder="Enter the quiz title"
          />
          {quizTitle && (
            <button
              type="button"
              onClick={handleTitleNext}
              className="px-4 py-2 text-white bg-gray-800 rounded-md"
            >
              Next
            </button>
          )}
        </div>
      )}

      {/* Number of Questions Input */}
      {showNumQuestionsInput && numQuestions === '' && (
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

      {/* Add Question Form */}
      {quizTitle &&
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

              <input
                type="text"
                name="correct_answer"
                value={questionData.correct_answer}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Correct Answer"
              />

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

      {/* Review and Submit Step */}
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
              <p>A: {q.option_a}</p>
              <p>B: {q.option_b}</p>
              <p>C: {q.option_c}</p>
              <p>D: {q.option_d}</p>
              <p>Correct Answer: {q.correct_answer}</p>
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
            Go to Start
          </button>
        </div>
      )}
    </div>
  );
};

AddQuestions.propTypes = {
  addQuizToAllQuestions: PropTypes.func.isRequired,
};

export default AddQuestions;
