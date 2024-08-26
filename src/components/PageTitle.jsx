import React from 'react';
import { Link } from 'react-router-dom';
import SearchField from './SearchField';
import PropTypes from 'prop-types';

const PageTitle = ({ text, onSearchChange, image, showSearch = true }) => {
  return (
    <div className="flex items-center justify-between w-full px-4 pt-2 pb-2 bg-white border border-b-slate-300 h-fit">
      <div className="block w-full md:flex md:items-center md:justify-between lg:w-1/2">
        <div className="pl-2 text-3xl font-bold uppercase md:pl-0 md:hidden">
          Admin
        </div>
        <div className="hidden pl-2 font-bold uppercase md:block md:pl-0">
          {text}
        </div>
        {showSearch && (
          <SearchField
            placeholder="Search something here .... "
            onSearchChange={onSearchChange}
          />
        )}
      </div>
      <div className="items-center justify-end hidden w-1/2 gap-5 lg:flex">
        <Link to="/about" className="flex gap-1">
          <img
            src={image}
            className="object-cover object-top w-10 h-10 rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

PageTitle.propTypes = {
  text: PropTypes.string,
  image: PropTypes.string,
  showSearch: PropTypes.bool,
  onSearchChange: PropTypes.func,
};

export default PageTitle;
