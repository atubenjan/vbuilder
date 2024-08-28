import React from 'react';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';
import AddQuestion from '../components/AddQuestions';
import QuestionsTable from '../components/QuestionsTable';

const Users = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main content */}
      <div className="flex-grow w-full h-full text-black bg-white">
        <PageTitle text="Users" showSearch={false} image={profile} />
        <div className="w-full p-4 pt-20">
          <AddQuestion />
          <QuestionsTable />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Users;
