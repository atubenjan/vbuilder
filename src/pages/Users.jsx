import React from 'react';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import profile from '../assets/profile.jpg';
import AddQuestion from '../components/AddQuestions';

const Users = () => {
  return (
    <div className='w-full'>
      <div className="w-full h-full text-black bg-white">
        <PageTitle text="Users" showSearch={false} image={profile} />
      </div>
      <div className='w-full px-5'>
        <AddQuestion />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Users;
