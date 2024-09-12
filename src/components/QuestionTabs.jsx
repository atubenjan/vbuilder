import React from 'react';
import PropTypes from 'prop-types';
import AddMCQQuestions from './AddMCQQuestions';

const QuestionTabs = ({ type }) => {
  switch (type) {
    case 'mcq':
      return (
        <div className="pt-3">
          <AddMCQQuestions />
        </div>
      );
    case 'trueFalse':
      return (
        <div>
          <h2>True/False Questions</h2>
          {/* Add True/False form fields here */}
        </div>
      );
    case 'shortAnswer':
      return (
        <div>
          <h2>Short Answer Questions</h2>
          {/* Add Short Answer form fields here */}
        </div>
      );
    default:
      return <div>Select a question type</div>;
  }
};

// Define prop types
QuestionTabs.propTypes = {
  type: PropTypes.oneOf(['mcq', 'trueFalse', 'shortAnswer']).isRequired,
};

export default QuestionTabs;
