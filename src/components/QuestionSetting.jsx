import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddQuestions from './AddQuestions';
import AllQuestions from './AllQuestions';
import QuestionToggleButtons from './QuestionToggleButtons';

const QuestionSetting = ({ role }) => {
  const [activeTab, setActiveTab] = useState('questionTypes');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  const addQuizToAllQuestions = (quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  const handleAttemptQuiz = (quiz) => {
    console.log('Attempting quiz:', quiz);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileDownload = () => {
    if (uploadedFile) {
      const fileURL = URL.createObjectURL(uploadedFile);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = uploadedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="pb-4 text-lg font-semibold">Question Settings</h2>
      <div className="items-center justify-start block gap-3 pb-3 mb-4 border-b-2 border-gray-200 sm:flex">
        {role === 'admin' ? (
          <>
            <div className="pb-2">
              <button
                onClick={() => setActiveTab('questionTypes')}
                className={`px-4 py-2 rounded-md ${activeTab === 'questionTypes' ? 'bg-slate-700 text-white' : 'bg-gray-200 text-black'}`}
              >
                Activate Question Type
              </button>
            </div>
          </>
        ) : role === 'organization' ? (
          <>
            <div className="pb-2">
              <button
                onClick={() => setActiveTab('uploadFile')}
                className={`px-4 py-2 rounded-md ${activeTab === 'uploadFile' ? 'bg-slate-700 text-white' : 'bg-gray-200 text-black'}`}
              >
                Upload File
              </button>
            </div>
            <div className="pb-2">
              <button
                onClick={() => setActiveTab('addQuestion')}
                className={`px-4 py-2 rounded-md ${activeTab === 'addQuestion' ? 'bg-slate-700 text-white' : 'bg-gray-200 text-black'}`}
              >
                Add Questions
              </button>
            </div>
          </>
        ) : role === 'user' ? (
          <>
            <div className="pb-2">
              <button
                onClick={() => setActiveTab('allQuestions')}
                className={`px-4 py-2 rounded-md ${activeTab === 'allQuestions' ? 'bg-slate-700 text-white' : 'bg-gray-200 text-black'}`}
              >
                All Quizzes
              </button>
            </div>
          </>
        ) : null}
      </div>

      {activeTab === 'questionTypes' && role === 'admin' && (
        <QuestionToggleButtons />
      )}
      {activeTab === 'uploadFile' && role === 'organization' && (
        <div className="mt-4">
          <input
            type="file"
            accept=".pdf, .xlsx, .xls, .docx"
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="px-4 py-2 mb-4 text-white rounded-md cursor-pointer bg-slate-700 hover:bg-slate-400 hover:text-black"
          >
            Upload notes
          </label>
          <button
            onClick={handleFileDownload}
            disabled={!uploadedFile}
            className="px-4 py-2 mb-4 ml-2 text-white rounded-md bg-slate-700 hover:bg-slate-400 hover:text-black"
          >
            Download notes
          </button>
        </div>
      )}

      {activeTab === 'addQuestion' && role === 'organization' && (
        <AddQuestions addQuizToAllQuestions={addQuizToAllQuestions} />
      )}

      {activeTab === 'allQuestions' && role === 'user' && (
        <AllQuestions quizzes={quizzes} onAttemptQuiz={handleAttemptQuiz} />
      )}
    </div>
  );
};

QuestionSetting.propTypes = {
  role: PropTypes.string.isRequired,
};

export default QuestionSetting;
