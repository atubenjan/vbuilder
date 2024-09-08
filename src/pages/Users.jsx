import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import UserTable from '../components/UserTable';

const Users = ({ role }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content */}
      <div className="flex-grow w-full h-full bg-slate-200 text-blackbg-slate-200">
        <PageTitle text="Users" role={role} />
        <div className="w-full p-4 pt-20">
          <UserTable />
          {/* <AddQuestion />
          <QuestionsTable /> */}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-slate-200">
        <Footer />
      </div>
    </div>
  );
};

Users.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Users;
