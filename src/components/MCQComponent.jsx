import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MCQComponent = ({ question, options, correctOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      <h2>{question}</h2>
      <form>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option${index}`}
              name="mcqOption"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option${index}`}>{option}</label>
          </div>
        ))}
      </form>
      <button type="button" onClick={handleSubmit}>Submit</button>
      {isSubmitted && (
        <div>
          {selectedOption === correctOption ? (
            <p>Correct!</p>
          ) : (
            <p>Incorrect. The correct answer is: {correctOption}</p>
          )}
        </div>
      )}
    </div>
  );
};

MCQComponent.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctOption: PropTypes.string.isRequired,
};

export default MCQComponent;