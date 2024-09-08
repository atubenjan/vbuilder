import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import Chatbot from '../components/ChatBot';

const AiAssistant = ({ role }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-grow">
        <PageTitle text="Ai Assistant" role={role} />
        <div className="px-2 pt-20 md:px-4">
          <Chatbot />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

AiAssistant.propTypes = {
  role: PropTypes.string.isRequired,
};

export default AiAssistant;
