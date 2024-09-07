import React from 'react';
import profile from '../assets/profile.jpg';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import QuestionSetting from '../components/QuestionSetting';

const QuestionsSetting = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content */}
      <div className="flex-grow w-full h-full bg-slate-200">
        <PageTitle
          text="Questions Setting"
          image={profile}
          showSearch={false}
        />
        <div className="p-4 h-full w-full pt-20 bg-slate-200">
          <QuestionSetting />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default QuestionsSetting;
