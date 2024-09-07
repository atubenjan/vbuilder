import React from 'react';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';
// import AddQuestion from '../components/AddQuestions';
// import QuestionsTable from '../components/QuestionsTable';
import UserTable from '../components/UserTable';

const Users = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content */}
      <div className="flex-grow w-full h-full bg-slate-200 text-blackbg-slate-200">
        <PageTitle text="Users" showSearch={false} image={profile} />
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

export default Users;
