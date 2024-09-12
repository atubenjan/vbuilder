import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const AddMCQQuestions = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [numQuestionsInput, setNumQuestionsInput] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isReviewStep, setIsReviewStep] = useState(false);
  const [showNumQuestionsInput, setShowNumQuestionsInput] = useState(false);
  const [isQuizTitleStepCompleted, setIsQuizTitleStepCompleted] =
    useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [file, setFile] = useState(null);
  const [questionData, setQuestionData] = useState({
    Question: '',
    OptionA: '',
    OptionB: '',
    OptionC: '',
    OptionD: '',
    CorrectAnswer: '',
    Difficulty: '',
    Score: '',
  });

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveQuestion = () => {
    if (
      !questionData.Question ||
      !questionData.OptionA ||
      !questionData.OptionB ||
      !questionData.OptionC ||
      !questionData.OptionD ||
      !questionData.CorrectAnswer ||
      !questionData.Difficulty ||
      !questionData.Score
    ) {
      alert('Please fill all required fields.');
      return;
    }

    if (editingIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = questionData;
      setQuestions(updatedQuestions);
      setEditingIndex(null);
    } else {
      setQuestions([...questions, questionData]);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    setQuestionData({
      Question: '',
      OptionA: '',
      OptionB: '',
      OptionC: '',
      OptionD: '',
      CorrectAnswer: '',
      Difficulty: '',
      Score: '',
    });

    if (currentQuestionIndex + 1 >= numQuestions && editingIndex === null) {
      setIsReviewStep(true);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setQuestionData(questions[index]);
    setIsReviewStep(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const quizResponse = await axios.post('http://localhost:5000/quizzes', {
        Title: quizTitle,
      });

      if (quizResponse.status === 200) {
        const quizId = quizResponse.data.QuizId;

        const questionsResponse = await axios.post(
          'http://localhost:5000/questions',
          {
            questions,
            QuizId: quizId,
          },
        );

        if (questionsResponse.status === 200) {
          alert('Quiz and questions saved successfully!');
        } else {
          console.error('Failed to save questions');
        }
      } else {
        console.error('Failed to save quiz info');
      }
    } catch (error) {
      console.error('Error submitting quiz and questions:', error);
    }
  };

  const handleNumQuestionsConfirm = () => {
    if (isNaN(numQuestionsInput) || numQuestionsInput <= 0) {
      alert('Please enter a valid number.');
      return;
    }
    setNumQuestions(Number(numQuestionsInput));
    setShowNumQuestionsInput(false);
  };

  const downloadQuestions = () => {
    const pdf = new jsPDF();
    let yOffset = 10;

    // Add quiz title
    pdf.setFontSize(16);
    pdf.text(`${quizTitle} Quiz`, 10, yOffset);
    yOffset += 10;

    // Add questions
    pdf.setFontSize(12);
    questions.forEach((question, index) => {
      if (yOffset > 280) {
        pdf.addPage();
        yOffset = 10;
      }

      pdf.text(`Question ${index + 1}: ${question.Question}`, 10, yOffset);
      yOffset += 10;
      pdf.text(`A) ${question.OptionA}`, 15, yOffset);
      yOffset += 5;
      pdf.text(`B) ${question.OptionB}`, 15, yOffset);
      yOffset += 5;
      pdf.text(`C) ${question.OptionC}`, 15, yOffset);
      yOffset += 5;
      pdf.text(`D) ${question.OptionD}`, 15, yOffset);
      yOffset += 7;
    });

    pdf.save(`${quizTitle.replace(/\s+/g, '_')}_questions.pdf`);
  };

  const handleGoBack = () => {
    setIsReviewStep(false);
    setNumQuestions('');
    setCurrentQuestionIndex(0);
    setQuestions([]);
  };

  const handleTitleNext = () => {
    if (!quizTitle) {
      alert('Please fill the quiz title.');
      return;
    }
    setIsQuizTitleStepCompleted(true);
    setShowNumQuestionsInput(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        alert('File uploaded successfully!');
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="w-full">
      {/* Quiz Title Input */}
      {!isQuizTitleStepCompleted && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Add MCQs Title:
          </label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none"
            placeholder="Enter the quiz title"
          />
          {quizTitle && (
            <button
              type="button"
              onClick={handleTitleNext}
              className="px-4 py-2 text-white bg-button rounded-md"
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
            className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none"
            placeholder="Enter number of questions"
          />
          <button
            type="button"
            onClick={handleNumQuestionsConfirm}
            className="px-4 py-2 text-white bg-button rounded-md"
          >
            Next
          </button>
        </div>
      )}

      {/* Add Question Form */}
      {numQuestions > 0 &&
        (currentQuestionIndex < numQuestions || editingIndex !== null) &&
        !isReviewStep && (
          <div className="p-5 border border-gray-200">
            <form>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Difficulty Level:
                  </label>
                  <select
                    name="Difficulty"
                    value={questionData.Difficulty}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none"
                  >
                    <option value="">Select difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Score:
                  </label>
                  <input
                    type="number"
                    name="Score"
                    value={questionData.Score}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none"
                    placeholder="Enter score"
                  />
                </div>
              </div>

              <label className="block mb-2 text-sm font-medium text-gray-900">
                Question{' '}
                {editingIndex !== null
                  ? editingIndex + 1
                  : currentQuestionIndex + 1}
                :
              </label>
              <input
                type="text"
                name="Question"
                value={questionData.Question}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />

              <label className="block mb-2 text-sm font-medium text-gray-900">
                Options:
              </label>
              <input
                type="text"
                name="OptionA"
                value={questionData.OptionA}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 1"
              />
              <input
                type="text"
                name="OptionB"
                value={questionData.OptionB}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 2"
              />
              <input
                type="text"
                name="OptionC"
                value={questionData.OptionC}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 3"
              />
              <input
                type="text"
                name="OptionD"
                value={questionData.OptionD}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 4"
              />

              <input
                type="text"
                name="CorrectAnswer"
                value={questionData.CorrectAnswer}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Correct Answer"
              />

              <button
                type="button"
                onClick={handleSaveQuestion}
                className="px-4 py-2 text-white bg-button rounded-md"
              >
                {editingIndex !== null ? 'Update Question' : 'Save Question'}
              </button>
            </form>
          </div>
        )}

      {/* Review Questions */}
      {isReviewStep && (
        <div className="p-5 border border-gray-200 rounded-lg">
          <h2 className="mb-4 text-xl font-semibold">Review Questions</h2>
          <p>Quiz Title: {quizTitle}</p>
          <div className="mb-2 p-4 border border-gray-300 rounded-md">
            {questions.map((question, index) => (
              <div key={index}>
                <p>
                  <strong>Question {index + 1}:</strong> {question.Question}
                </p>
                <p>Option A: {question.OptionA}</p>
                <p>Option B: {question.OptionB}</p>
                <p>Option C: {question.OptionC}</p>
                <p>Option D: {question.OptionD}</p>
                <p>
                  <strong>Correct Answer:</strong> {question.CorrectAnswer}
                </p>
                <p>Difficulty: {question.Difficulty}</p>
                <p>Score: {question.Score}</p>
                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  className="mt-2 px-4 mb-2 py-2 text-white bg-blue-500 rounded-md"
                >
                  Edit
                </button>
              </div>
            ))}
            <div className="mb-2">
              <input
                type="file"
                accept=".doc,.pdf"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleFileUpload}
                className="px-4 py-2 my-2 text-white bg-button rounded-md"
              >
                Upload File
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-button rounded-md"
            >
              Submit Quiz
            </button>
            <button
              type="button"
              onClick={downloadQuestions}
              className="px-4 py-2 text-white bg-button rounded-md"
            >
              Download Questions
            </button>
            <button
              type="button"
              onClick={handleGoBack}
              className="px-4 py-2 text-white bg-button rounded-md"
            >
              Add new Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMCQQuestions;
