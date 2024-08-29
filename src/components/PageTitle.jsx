import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

const PageTitle = ({ text }) => {
  // const navigate = useNavigate()

  // const handleLogin = ()=>{
  //   navigate('/login')
  // }

  return (
    <div className="fixed z-10 flex items-center justify-between w-full px-4 pt-2 pb-2 bg-white border border-b-slate-300 h-fit">
      <div className="block w-full md:flex md:items-center md:justify-between lg:w-1/2">
        <div className="pl-2 text-3xl font-bold uppercase md:pl-0 md:hidden">
          Admin
        </div>
        <div className="hidden pl-2 font-bold uppercase md:block md:pl-0">
          {text}
        </div>
      </div>
      {/* <div className="items-center justify-end hidden w-1/2 gap-5 lg:flex">
        <button onClick={handleLogin} className="flex gap-1">
          Login
        </button>
      </div> */}
    </div>
  );
};

PageTitle.propTypes = {
  text: PropTypes.string,
  image: PropTypes.string,
  showSearch: PropTypes.bool,
};

export default PageTitle;
