import React from 'react';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import profile from '../assets/profile.jpg';
import HomePage from '../components/HomePage';

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full h-full text-black bg-slate-200">
        <PageTitle text="Home" showSearch={false} image={profile} />
        <HomePage />
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
