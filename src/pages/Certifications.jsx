import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';

const Certifications = ({ role }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full h-full text-black bg-slate-200">
        <PageTitle text="Certifications" role={role} />
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h2>Certifications</h2>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

Certifications.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Certifications;
