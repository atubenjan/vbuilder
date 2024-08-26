import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const SearchField = ({ placeholder, type = 'text', value, onSearchChange }) => {
  const [error, setError] = useState('');

  return (
    <div className="relative w-64 lg:w-80">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onSearchChange}
        className="w-full h-8 pl-4 pr-8 border-none rounded-lg outline-none bg-slate-300"
      />
      <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 right-2 top-1/2" />
      {error && <p className="error-message">{() => setError(error)}</p>}
    </div>
  );
};

// Prop types validation
SearchField.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  validate: PropTypes.func,
};

SearchField.defaultProps = {
  placeholder: '',
  type: 'text',
  validate: null,
};

export default SearchField;
