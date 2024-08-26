import React from 'react';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';
import Footer from '../components/Footer';
import DashboardSummary from '../components/DashboardSummary';

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full h-full text-black bg-white">
        <PageTitle text="Dashboard" showSearch={false} image={profile} />
        <DashboardSummary />
      </div>
      
      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
