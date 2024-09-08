import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import QuestionSetting from '../components/QuestionSetting';

const QuestionsSetting = ({ role }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content */}
      <div className="flex-grow w-full h-full bg-slate-200">
        <PageTitle text="Questions Setting" role={role} />
        <div className="p-4 h-full w-full pt-20 bg-slate-200">
          <QuestionSetting role={role} />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

QuestionsSetting.propTypes = {
  role: PropTypes.string.isRequired,
};

export default QuestionsSetting;
