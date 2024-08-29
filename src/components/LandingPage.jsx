import React from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { SiTestcafe } from 'react-icons/si';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };
  return (
    <>
      <div className="fixed z-10 flex items-center justify-between w-full px-4 py-3 bg-white border border-b-slate-300 h-fit">
        <Link to="/" className="pl-2 text-xl font-bold uppercase">
          Home
        </Link>
        <div className="flex items-center justify-end w-1/2 gap-5">
          <button onClick={handleGetStarted} className="flex gap-1">
            Login
          </button>
        </div>
      </div>
      <div className="w-full p-4 pt-28 bg-slate-200">
        <div className="grid items-center justify-between w-full grid-cols-1 gap-5 md:grid-cols-2">
          <div className="grid-cols-1 text-center">
            <h2 className="text-xl lg:text-2xl">
              Welcome to VLearned MCQs. Prepare with confidence.
            </h2>
            <p className="py-10 text-lg">Get ready with high level MCQs.</p>
            <button
              onClick={handleGetStarted}
              className="px-6 py-2 text-center bg-white rounded-lg hover:bg-slate-700 hover:text-white"
            >
              {' '}
              Get Started
            </button>
          </div>
          <div className="relative grid-cols-1 overflow-hidden">
            <img
              src="https://www.openaccessgovernment.org/wp-content/uploads/2022/07/dreamstime_xxl_134207290-scaled.jpg"
              className="object-cover object-center w-full h-auto"
              alt="Students in Class"
            />
          </div>
        </div>
        <div className="py-10">
          <h2 className="text-2xl font-bold text-center capitalize">
            What we offer
          </h2>
          <div className="grid grid-cols-1 pt-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="px-4 text-center">
              <div className="flex items-center justify-center w-full text-5xl">
                <SiTestcafe />
              </div>
              <h3 className="mt-2 text-lg font-bold">Live Tests</h3>
              <p className="py-3 text-base">
                Readily available tests anytime, anywhere with just a click of
                button.
              </p>
            </div>
            <div className="px-4 text-center">
              <div className="flex items-center justify-center w-full text-5xl">
                <FaRegQuestionCircle />
              </div>
              <h3 className="mt-2 text-lg font-bold">High Yield Questions</h3>
              <p className="py-3 text-base ">
                High quality questions to test capabilities and learn.
              </p>
            </div>
            <div className="px-4 text-center">
              <div className="flex items-center justify-center w-full text-5xl">
                <TbBrandGoogleAnalytics />
              </div>
              <h3 className="mt-2 text-lg font-bold">Insightful Analytics</h3>
              <p className="py-3 text-base ">
                Get tested anytime, anywhere with just a click of button.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
