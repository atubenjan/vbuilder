import React from 'react';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';
import Footer from '../components/Footer';
import DashboardSummary from '../components/DashboardSummary';

const Dashboard = () => {
  return (
    <div className="w-full space-y-4 text-white">
      <div className="w-full h-full text-black bg-white">
        <PageTitle text="Dashboard" showSearch={false} image={profile} />
      </div>
      <DashboardSummary />

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
