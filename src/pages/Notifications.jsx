import React from 'react';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';

const Notifications = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full h-full text-black bg-slate-200">
        <PageTitle text="Notifications" />
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h2>Notifications</h2>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Notifications;
