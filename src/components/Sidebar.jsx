import React, { useState } from 'react';
import {
  FaBars,
  FaHome,
  FaLockOpen,
  FaMoneyBill,
  FaRegQuestionCircle,
  FaTimes,
  FaUsers,
} from 'react-icons/fa';
import { GiArchiveRegister } from 'react-icons/gi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdAssistant, MdLogout } from 'react-icons/md';
import { RiOrganizationChart } from 'react-icons/ri';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = ()=>{
    setIsOpen(!isOpen)
  }

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-10 h-full text-white bg-gray-800 md:w-60">
      <div className="relative">
        <button
          className={`absolute z-50 text-xl rounded-full bg-transparent ${
            isOpen
              ? 'text-black top-6 left-[200px] border border-slate-700 bg-white p-2'
              : 'top-4 left-72 text-slate-700'
          } md:hidden`}
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:block`}
      >
        <div className="py-4 text-center">
          <Link to="/" className="text-3xl">
            Admin
          </Link>
        </div>
        <nav className="flex flex-col gap-1 px-4">
          <Link
            to="/"
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-700 ${
              activeLink === '/' ? 'bg-gray-700' : ''
            }`}
            onClick={() => handleLinkClick('/')}
          >
            <FaHome />
            <span>Home</span>
          </Link>
          <Link
            to="/users"
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-700 ${
              activeLink === '/users' ? 'bg-gray-700' : ''
            }`}
            onClick={() => handleLinkClick('/users')}
          >
            <FaUsers />
            <span>Users</span>
          </Link>
          <Link
            to="/questions"
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-700 ${
              activeLink === '/questions' ? 'bg-gray-700' : ''
            }`}
            onClick={() => handleLinkClick('/questions')}
          >
            <FaRegQuestionCircle />
            <span>Questions Setting</span>
          </Link>
          <Link
            to="/organization"
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-700 ${
              activeLink === '/organization' ? 'bg-gray-700' : ''
            }`}
            onClick={() => handleLinkClick('/organization')}
          >
            <RiOrganizationChart />
            <span>Organization</span>
          </Link>
          <Link
            to="/analytics"
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-700 ${
              activeLink === '/analytics' ? 'bg-gray-700' : ''
            }`}
            onClick={() => handleLinkClick('/analytics')}
          >
            <TbBrandGoogleAnalytics />
            <span>Analytics</span>
          </Link>
          <Link
            to="/subscription"
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-700 ${
              activeLink === '/subscription' ? 'bg-gray-700' : ''
            }`}
            onClick={() => handleLinkClick('/subscription')}
          >
            <FaMoneyBill />
            <span>Subscription</span>
          </Link>
          <Link
            to="/aiassistant"
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-700 ${
              activeLink === '/aiassistant' ? 'bg-gray-700' : ''
            }`}
            onClick={() => handleLinkClick('/aiassistant')}
          >
            <MdAssistant />
            <span>Ai Assistant</span>
          </Link>
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className={` ${isOpen?'bg-gray-700':''}  hover:bg-gray-700 flex justify-start items-center w-full px-4 py-2 rounded-md focus:outline-none`}
            >
              <span className='pr-4'><GiArchiveRegister /></span> 
              <span>Register</span>
              <span className='pl-14'>{isOpen? <IoIosArrowUp />:<IoIosArrowDown />}</span>
            </button>

            {isOpen && (
              <div className="absolute right-0 z-10 w-full mt-2 origin-top-right divide-y rounded-md">
                <div className="py-1">
                  <Link
                    to="/signup"
                    className={`flex items-center gap-4 px-4 py-2 my-1 rounded-md hover:bg-gray-700 ${
                      activeLink === '/signup' ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => handleLinkClick('/signup')}
                  >
                    <MdLogout />
                    <span>Signup</span>
                  </Link>
                  <Link
                    to="/login"
                    className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-700 ${
                      activeLink === '/login' ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => handleLinkClick('/login')}
                  >
                    <FaLockOpen />
                    <span>Login</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
