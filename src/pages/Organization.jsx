import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Organization = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('mcq');

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path === 'truefalse' || path === 'mcq') {
      setActiveTab(path);
    } else {
      setActiveTab('mcq'); // Default tab
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-grow">
        <PageTitle text="Organization" image={profile} showSearch={false} />
        <div className="p-4 pt-20">
          <div className="flex mb-4">
            <Link
              to="mcq"
              onClick={() => setActiveTab('mcq')}
              className={`px-4 py-2 mr-2 rounded ${activeTab === 'mcq' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              MCQs
            </Link>
            <Link
              to="truefalse"
              onClick={() => setActiveTab('truefalse')}
              className={`px-4 py-2 rounded ${activeTab === 'truefalse' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              True/False
            </Link>
          </div>
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Organization;
