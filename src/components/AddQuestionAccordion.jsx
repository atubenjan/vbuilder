import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionAccordion = () => {
  const [questionType, setQuestionType] = useState(''); // Choose Single, MCQ, or Essay
  const [numQuestionsInput, setNumQuestionsInput] = useState(''); // Input for number of questions
  const [numQuestions, setNumQuestions] = useState(''); // Final number of questions after confirmation
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question number
  const [questions, setQuestions] = useState([]); // Store all questions

  const [questionData, setQuestionData] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
  });

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveQuestion = () => {
    setQuestions([...questions, questionData]);

    // Reset form for the next question
    setQuestionData({
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: '',
    });

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // POST request to save all questions
    axios
      .post('http://localhost:5000/save-questions', { questions })
      .then((response) => {
        console.log('Questions added successfully:', response.data);
        // Clear the form after successful submission
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setNumQuestions('');
      })
      .catch((error) => {
        console.error('There was an error adding the questions:', error);
      });
  };

  const handleNumQuestionsConfirm = () => {
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

  return (
    <div className="w-full">
      {/* Step 1: Choose Question Type */}
      {!questionType && (
        <div className="mb-4 w-full md:w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Choose Question Type:
          </label>
          <select
            value={questionType}
            onChange={handleQuestionTypeChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          >
            <option value="">Select Type</option>
            <option value="single">Single Choice</option>
            <option value="mcq">Multiple Choice</option>
            <option value="essay">Essay</option>
          </select>
        </div>
      )}

      {/* Step 2: Specify Number of Questions */}
      {questionType && numQuestions === '' && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Number of Questions:
          </label>
          <input
            type="text"
            value={numQuestionsInput}
            onChange={(e) => setNumQuestionsInput(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            placeholder="Enter number of questions"
          />
          <button
            type="button"
            onClick={handleNumQuestionsConfirm}
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 3: Create Questions */}
      {questionType &&
        numQuestions > 0 &&
        currentQuestionIndex < numQuestions && (
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

              {questionType !== 'essay' && (
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
              )}

              <button
                type="button"
                onClick={handleSaveQuestion}
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Save Question {currentQuestionIndex + 1}
              </button>
            </form>
          </div>
        )}

      {/* Step 4: Display Questions and Submit or Download */}
      {currentQuestionIndex === parseInt(numQuestions) && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Review Your Questions</h2>
          <ul className="mb-6">
            {questions.map((q, index) => (
              <li
                key={index}
                className="mb-4 p-4 border border-gray-300 rounded-md"
              >
                <p className="font-medium">
                  Question {index + 1}: {q.question_text}
                </p>
                {q.option_a && <p>Option A: {q.option_a}</p>}
                {q.option_b && <p>Option B: {q.option_b}</p>}
                {q.option_c && <p>Option C: {q.option_c}</p>}
                {q.option_d && <p>Option D: {q.option_d}</p>}
                {q.correct_answer && <p>Correct Answer: {q.correct_answer}</p>}
              </li>
            ))}
          </ul>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 mr-4 text-white bg-green-600 rounded-md"
          >
            Submit Questions
          </button>
          <button
            onClick={downloadQuestions}
            className="px-4 py-2 text-white bg-yellow-600 rounded-md"
          >
            Download Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default AddQuestionAccordion;
