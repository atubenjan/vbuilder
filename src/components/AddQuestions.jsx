import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddQuestions = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizId, setQuizId] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [numQuestionsInput, setNumQuestionsInput] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isReviewStep, setIsReviewStep] = useState(false);
  const [showNumQuestionsInput, setShowNumQuestionsInput] = useState(false);

  const [questionData, setQuestionData] = useState({
    Question: '',
    OptionA: '',
    OptionB: '',
    OptionC: '',
    OptionD: '',
    CorrectAnswer: '',
  });

  const [nextQuestionId, setNextQuestionId] = useState(1);

  // Generate random quiz ID
  useEffect(() => {
    const generateRandomQuizId = () => {
      const randomNumber = Math.floor(Math.random() * 999) + 1;
      const formattedNumber = String(randomNumber).padStart(3, '0');
      return `VB${formattedNumber}`;
    };
    setQuizId(generateRandomQuizId());
  }, []);

  // Generate random question ID
  useEffect(() => {
    const generateRandomQuestionId = () => {
      const randomNumber = Math.floor(Math.random() * 99999) + 1;
      const formattedNumber = String(randomNumber).padStart(5, '0');
      return formattedNumber;
    };
    setQuestionId(generateRandomQuestionId());
  }, []);

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
      !questionData.CorrectAnswer
    ) {
      alert('Please fill all required fields.');
      return;
    }

    const questionId = nextQuestionId;
    setNextQuestionId(nextQuestionId + 1);

    setQuestions([...questions, { ...questionData, QuestionId: questionId }]);

    setQuestionData({
      Question: '',
      OptionA: '',
      OptionB: '',
      OptionC: '',
      OptionD: '',
      CorrectAnswer: '',
    });

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex + 1 >= numQuestions) {
      setIsReviewStep(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const quizResponse = await axios.post('http://localhost:5000/quizzes', {
        Title: quizTitle,
        QuizId: quizId,
      });

      if (quizResponse.status === 200) {
        console.log('Quiz info saved:', quizResponse.data);

        const questionsResponse = await axios.post(
          'http://localhost:5000/questions',
          {
            questions,
            QuizId: quizId,
          },
        );

        if (questionsResponse.status === 200) {
          console.log('Questions saved successfully:', questionsResponse.data);
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
    setShowNumQuestionsInput(false); // Hide the input after confirming
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
    setNextQuestionId(1);
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
            className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none"
            placeholder="Enter the quiz title"
          />

          {/* Quiz ID Input */}
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Quiz ID:
          </label>
          <input
            type="text"
            value={quizId}
            readOnly
            className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none"
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
            className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none"
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
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Question ID:
              </label>
              <input
                type="text"
                value={questionId}
                readOnly
                className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none"
              />
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
                className="px-4 py-2 text-white bg-gray-800 rounded-md"
              >
                Save Question
              </button>
            </form>
          </div>
        )}

      {/* Review Questions */}
      {isReviewStep && (
        <div className="p-5 border border-gray-200">
          <h2 className="mb-4 text-xl font-semibold">Review Questions</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index} className="mb-2">
                <p className="font-bold">
                  Q{index + 1}: {question.Question}
                </p>
                <p>A. {question.OptionA}</p>
                <p>B. {question.OptionB}</p>
                <p>C. {question.OptionC}</p>
                <p>D. {question.OptionD}</p>
                <p>Correct Answer: {question.CorrectAnswer}</p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleGoBack}
            className="px-4 py-2 mr-4 text-white bg-gray-800 rounded-md"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={downloadQuestions}
            className="px-4 py-2 text-white bg-gray-800 rounded-md"
          >
            Download Questions
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-gray-800 rounded-md"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default AddQuestions;
