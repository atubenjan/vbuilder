import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import HomeCharts from '../components/HomeCharts';

const Home = ({ role }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full h-full text-black bg-slate-200">
        <PageTitle text="Home" role={role} />
        <HomePage />
        <HomeCharts />
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

Home.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Home;
