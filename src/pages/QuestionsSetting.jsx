import React from 'react';
import profile from '../assets/profile.jpg';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';

const QuestionsSetting = () => {
  return (
    <div className="w-full space-y-4">
      <div className="w-full h-full">
        <PageTitle text="Questions Setting" image={profile} showSearch={false} />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default QuestionsSetting;
