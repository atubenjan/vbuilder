import React from 'react';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';
import Chatbot from '../components/ChatBot';

const AiAssistant = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-grow">
        <PageTitle text="Ai Assistant" image={profile} showSearch={false} />
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

export default AiAssistant;
