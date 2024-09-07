import React, { useState } from 'react';
import PropTypes from 'prop-types';

const QuestionTypeDropDown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-1/2">
      <h2 className="pb-4">Choose Question Type</h2>
      <div
        className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value
          ? options.find((option) => option.value === value).label
          : 'Select Type'}
      </div>

      {isOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="p-2 cursor-pointer hover:bg-gray-800 hover:rounded-md hover:text-white"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Prop validation
QuestionTypeDropDown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuestionTypeDropDown;
