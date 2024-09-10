import React, { useState } from 'react';
import axios from 'axios';

const AddQuestions = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizId, setQuizId] = useState('');
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

  const [nextQuestionId, setNextQuestionId] = useState(1);

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveQuestion = async () => {
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

    const questionId = nextQuestionId;
    setNextQuestionId(nextQuestionId + 1);

    setQuestions([...questions, { ...questionData, question_id: questionId }]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save the quiz title and quiz ID
      const quizResponse = await axios.post('http://localhost:5000/quizzes', {
        title: quizTitle,
        quiz_id: quizId,
      });

      if (quizResponse.status === 200) {
        console.log('Quiz info saved:', quizResponse.data);

        // Save the questions associated with the quiz ID
        const questionsResponse = await axios.post(
          'http://localhost:5000/questions',
          {
            questions,
            quiz_id: quizId,
          },
        );

        if (questionsResponse.status === 200) {
          console.log('Questions saved successfully' + questionsResponse.data);
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
            onChange={(e) => setQuizId(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none"
            placeholder="Enter quiz ID"
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

      {/* Review Step */}
      {isReviewStep && (
        <div>
          <h3 className="mb-4 text-lg font-bold text-gray-800">
            Review Questions
          </h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index} className="mb-2">
                {index + 1}. {question.question_text} (Correct Answer:{' '}
                {question.correct_answer})
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              type="button"
              onClick={downloadQuestions}
              className="px-4 py-2 text-white bg-gray-800 rounded-md"
            >
              Download Questions
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 ml-4 text-white bg-blue-600 rounded-md"
            >
              Submit Quiz
            </button>
            <button
              type="button"
              onClick={handleGoBack}
              className="px-4 py-2 ml-4 text-white bg-red-600 rounded-md"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestions;
