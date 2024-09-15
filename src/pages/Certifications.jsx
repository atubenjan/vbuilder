import React from 'react';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import UserCertification from '../components/userCertification';
import AdminCertifications from '../components/AdminCertifications';

const Certifications = () => {
  const role = localStorage.getItem('role');
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex-grow w-full h-full text-black bg-slate-100">
        <PageTitle text="Certifications" />
        <div className="w-full min-h-[80vh] pt-20 flex flex-col items-center px-2 md:px-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">
            {role === 'user' ? 'Certificates Eraned' : 'Certificates Issued'}
          </h2>
          {role === 'user' ? <UserCertification /> : <AdminCertifications />}
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Certifications;
