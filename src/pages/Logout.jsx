import React from 'react';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleNoLogout = () => {
    navigate('/home');
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full h-full text-black bg-white">
        <PageTitle text="Logout" showSearch={false} />
        <div className="flex items-center justify-center w-full h-full pt-20">
          <div className="p-10 bg-slate-700 text-white rounded-lg shadow-xl">
            <h2>Are you sure you want to logout?</h2>
            <div className="flex items-center justify-around w-full pt-10 pb-0">
              <button
                onClick={handleLogout}
                className="px-5 py-1 rounded-lg bg-white text-black hover:bg-slate-400"
              >
                Yes
              </button>
              <button
                onClick={handleNoLogout}
                className="px-5 py-1 rounded-lg bg-white text-black hover:bg-slate-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Logout;
