import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import HomeCharts from '../components/HomeCharts';

const Analytics = ({ role }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full h-full text-black bg-white">
        <PageTitle text="Analytics" role={role} />
        <div className="w-full pt-20 px-2 md:px-4 bg-slate-200">
          <HomeCharts />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

Analytics.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Analytics;
