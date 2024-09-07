import React from 'react';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';
import Footer from '../components/Footer';
import SubscriptionCardContainer from '../components/SubscriptionCardContainer';

const Subscription = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full h-full text-black bg-white">
        <PageTitle text="Subscription" showSearch={false} image={profile} />
        <div className="px-2 pt-20 md:px-4 bg-slate-200 pb-4">
          <SubscriptionCardContainer />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Subscription;
