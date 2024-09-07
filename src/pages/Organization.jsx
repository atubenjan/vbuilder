import React from 'react';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';
import OrganizationTable from '../components/OrganizationTable';
// import { Link, Outlet, useLocation } from 'react-router-dom';

const Organization = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-grow bg-slate-200">
        <PageTitle text="Organization" image={profile} showSearch={false} />
        <div className="p-4 pt-20 bg-slate-200">
          <OrganizationTable />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Organization;
