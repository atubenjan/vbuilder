import React, { useState } from 'react';
import AddQuestionAccordion from './AddQuestionAccordion';
// import AllQuestions from './AllQuestions';

const QuestionSetting = () => {
  const [activeTab, setActiveTab] = useState('questionTypes');
  const [showMCQ, setShowMCQ] = useState(false);
  const [showTrueFalse, setShowTrueFalse] = useState(false);
  const [showShortAnswers, setShowShortAnswers] = useState(false);
  const [showFillInTheBlank, setShowFillInTheBlank] = useState(false);
  const [showMarchingPairs, setShowMarchingPairs] = useState(false);
  const [showEssayQuestions, setShowEssayQuestions] = useState(false);
  const [showDragnDrop, setShowDragnDrop] = useState(false);
  const [showPuzzles, setShowPuzzles] = useState(false);
  const [showSimulations, setShowSimulations] = useState(false);
  const [showPeerReviewAssignments, setShowPeerReviewAssignments] =
    useState(false);
  const [showCaseStudies, setShowCaseStudies] = useState(false);
  const [showProjectBasedAssignments, setShowProjectBasedAssignments] =
    useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

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
    <div className="p-4 pt-20">
      <h2 className="pb-4 text-lg font-semibold">Question Settings</h2>
      <div className="items-center justify-start block gap-3 pb-3 mb-4 border-b-2 border-gray-200 sm:flex">
        <div className="pb-2">
          <button
            onClick={() => setActiveTab('questionTypes')}
            className={`px-4 py-2 rounded-md ${activeTab === 'questionTypes' ? 'bg-slate-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            Activate Question Type
          </button>
        </div>
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
        {/* <div className="pb-2">
          <button
            onClick={() => setActiveTab('allQuestions')}
            className={`px-4 py-2 rounded-md ${activeTab === 'allQuestions' ? 'bg-slate-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            All Questions
          </button>
        </div> */}
      </div>

      {activeTab === 'questionTypes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showMCQ}
                onChange={() => setShowMCQ(!showMCQ)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                MCQ
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showTrueFalse}
                onChange={() => setShowTrueFalse(!showTrueFalse)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                True/False
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showShortAnswers}
                onChange={() => setShowShortAnswers(!showShortAnswers)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Short Answers
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showFillInTheBlank}
                onChange={() => setShowFillInTheBlank(!showFillInTheBlank)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Fill In The Blanks
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showMarchingPairs}
                onChange={() => setShowMarchingPairs(!showMarchingPairs)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Matching Pairs
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showEssayQuestions}
                onChange={() => setShowEssayQuestions(!showEssayQuestions)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Essay Questions
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showDragnDrop}
                onChange={() => setShowDragnDrop(!showDragnDrop)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Drag and Drop
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showPuzzles}
                onChange={() => setShowPuzzles(!showPuzzles)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Crosswords and Puzzles
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showSimulations}
                onChange={() => setShowSimulations(!showSimulations)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Interactive Simulations
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showPeerReviewAssignments}
                onChange={() =>
                  setShowPeerReviewAssignments(!showPeerReviewAssignments)
                }
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Peer Review Assignments
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showCaseStudies}
                onChange={() => setShowCaseStudies(!showCaseStudies)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Case Studies
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showProjectBasedAssignments}
                onChange={() =>
                  setShowProjectBasedAssignments(!showProjectBasedAssignments)
                }
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-700 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-700 peer-checked:bg-slate-700"></div>
              <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                Project-Based Assignments
              </span>
            </label>
          </div>
        </div>
      )}

      {activeTab === 'uploadFile' && (
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

      {activeTab === 'addQuestion' && <AddQuestionAccordion />}
      {/* {activeTab === 'allQuestions' && <AllQuestions />} */}
    </div>
  );
};

export default QuestionSetting;
