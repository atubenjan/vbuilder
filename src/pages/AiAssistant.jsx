import React from 'react';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';

const AiAssistant = () => {
  return (
    <div className="w-full space-y-4">
      <div className="w-full h-full">
        <PageTitle text="Ai Assistant" image={profile} showSearch={false} />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AiAssistant;
