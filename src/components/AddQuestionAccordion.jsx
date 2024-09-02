import React, { useState } from 'react';

const AddQuestionAccordion = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div id="accordion-collapse" className="w-full">
      {/* Single Choice */}
      <div>
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl"
            onClick={() => toggleAccordion(1)}
            aria-expanded={openAccordion === 1}
          >
            <span>Add Single Choice Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 1 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 1 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <label className="block mb-2 text-sm font-medium text-gray-900">Options:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 1"
              />
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 2"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Multiple Choice */}
      <div>
        <h2 id="accordion-collapse-heading-2">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200"
            onClick={() => toggleAccordion(2)}
            aria-expanded={openAccordion === 2}
          >
            <span>Add Multiple Choice Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 2 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 2 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <label className="block mb-2 text-sm font-medium text-gray-900">Options:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 1"
              />
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 2"
              />
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 3"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>

      {/* True/False */}
      <div>
        <h2 id="accordion-collapse-heading-3">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200"
            onClick={() => toggleAccordion(3)}
            aria-expanded={openAccordion === 3}
          >
            <span>Add True/False Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 3 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 3 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <label className="block mb-2 text-sm font-medium text-gray-900">Answer:</label>
              <select className="w-full p-2 mb-4 border border-gray-300 rounded-md">
                <option>True</option>
                <option>False</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Short Answer */}
      <div>
        <h2 id="accordion-collapse-heading-4">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200"
            onClick={() => toggleAccordion(4)}
            aria-expanded={openAccordion === 4}
          >
            <span>Add Short Answer Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 4 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 4 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Fill in the Blank */}
      <div>
        <h2 id="accordion-collapse-heading-5">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200"
            onClick={() => toggleAccordion(5)}
            aria-expanded={openAccordion === 5}
          >
            <span>Add Fill in the Blank Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 5 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 5 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <label className="block mb-2 text-sm font-medium text-gray-900">Correct Answer:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter the correct answer"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Add more question types here in similar fashion */}

      {/* Matching Pairs */}
      <div>
        <h2 id="accordion-collapse-heading-6">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200"
            onClick={() => toggleAccordion(6)}
            aria-expanded={openAccordion === 6}
          >
            <span>Add Matching Pairs Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 6 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 6 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <label className="block mb-2 text-sm font-medium text-gray-900">Options:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 1"
              />
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 2"
              />
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 3"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Essay Questions */}
      <div>
        <h2 id="accordion-collapse-heading-7">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200"
            onClick={() => toggleAccordion(7)}
            aria-expanded={openAccordion === 7}
          >
            <span>Add Essay Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 7 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 7 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Drag and Drop */}
      <div>
        <h2 id="accordion-collapse-heading-8">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200"
            onClick={() => toggleAccordion(8)}
            aria-expanded={openAccordion === 8}
          >
            <span>Add Drag and Drop Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 8 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 8 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <label className="block mb-2 text-sm font-medium text-gray-900">Options:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 1"
              />
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Option 2"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Puzzles */}
      <div>
        <h2 id="accordion-collapse-heading-9">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200"
            onClick={() => toggleAccordion(9)}
            aria-expanded={openAccordion === 9}
          >
            <span>Add Puzzle Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 9 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 9 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Simulations */}
      <div>
        <h2 id="accordion-collapse-heading-10">
          <button
            type="button"
            className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-500 border border-b-0 border-gray-200"
            onClick={() => toggleAccordion(10)}
            aria-expanded={openAccordion === 10}
          >
            <span>Add Simulation Question</span>
            <svg
              className={`w-3 h-3 transform ${openAccordion === 10 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openAccordion === 10 && (
          <div className="p-5 border border-b-0 border-gray-200">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900">Question:</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Add Question
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQuestionAccordion;
