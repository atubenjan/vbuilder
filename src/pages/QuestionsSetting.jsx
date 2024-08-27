import React from 'react';
import profile from '../assets/profile.jpg';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import QuestionSetting from '../components/QuestionSetting';

const QuestionsSetting = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content */}
      <div className="flex-grow w-full h-full">
        <PageTitle
          text="Questions Setting"
          image={profile}
          showSearch={false}
        />
        <QuestionSetting />
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default QuestionsSetting;
