import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
// import AddQuestions from '../components/AddQuestions';
import OrganizationQuestions from '../components/OrganizationQuestions';

const Organization = ({ role }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-grow bg-slate-200">
        <PageTitle text="Organization" role={role} />
        <div className="px-4 pt-20 bg-slate-200">
          <OrganizationQuestions />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

Organization.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Organization;
