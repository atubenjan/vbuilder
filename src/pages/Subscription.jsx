import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import SubscriptionCardContainer from '../components/SubscriptionCardContainer';

const Subscription = ({ role }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full h-full text-black bg-white">
        <PageTitle text="Subscription" role={role} />
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

Subscription.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Subscription;
