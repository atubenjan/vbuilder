import React, { useState } from 'react';
import {
  FaBars,
  FaCertificate,
  FaHome,
  FaMoneyBill,
  FaRegQuestionCircle,
  FaTimes,
  FaUsers,
} from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdAssistant, MdLogout } from 'react-icons/md';
import { RiOrganizationChart } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-20 h-full text-white md:w-60">
      <div className="relative">
        <button
          className={`absolute z-50 text-xl rounded-full bg-transparent ${
            isOpen
              ? 'text-icon top-2 left-[215px] border border-icon bg-background p-2'
              : 'top-5 left-72 text-icon'
          } md:hidden`}
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-background text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:block`}
      >
        <div className="py-4 pl-8 text-left">
          <Link to="/home" className="text-xl font-bold">
            {role === 'admin'
              ? 'VBuilder Admin'
              : role === 'organization'
                ? 'VBuilder Org'
                : 'VBuilder'}
          </Link>
        </div>
        <nav className="flex flex-col gap-1 px-4">
          <Link
            to="/home"
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
              activeLink === '/' ? 'bg-button' : ''
            }`}
            onClick={() => handleLinkClick('/')}
          >
            <FaHome />
            <span>Home</span>
          </Link>

          {/* Common menu items for all users */}
          {role == 'user' && (
            <>
              <Link
                to="/questions"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/questions' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/questions')}
              >
                <FaRegQuestionCircle />
                <span>Questions</span>
              </Link>
              <Link
                to="/organization"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/organization' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/organization')}
              >
                <RiOrganizationChart />
                <span>Organization</span>
              </Link>
              <Link
                to="/certifications"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/certifications' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/certifications')}
              >
                <FaCertificate />
                <span>Certifications</span>
              </Link>
              <Link
                to="/notifications"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/notifications' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/notifications')}
              >
                <IoNotificationsOutline />
                <span>Notifications</span>
              </Link>
            </>
          )}

          {/* Admin-specific menu items */}
          {role === 'organization' && (
            <>
              <Link
                to="/users"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/users' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/users')}
              >
                <FaUsers />
                <span>Users</span>
              </Link>
              <Link
                to="/questions"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/questions' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/questions')}
              >
                <FaRegQuestionCircle />
                <span>Questions Setting</span>
              </Link>
              <Link
                to="/organization"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/organization' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/organization')}
              >
                <RiOrganizationChart />
                <span>Organization</span>
              </Link>
              <Link
                to="/subscription"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/subscription' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/subscription')}
              >
                <FaMoneyBill />
                <span>Subscription</span>
              </Link>
              <Link
                to="/aiassistant"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/aiassistant' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/aiassistant')}
              >
                <MdAssistant />
                <span>AI Assistant</span>
              </Link>
              <Link
                to="/certifications"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/certifications' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/certifications')}
              >
                <FaCertificate />
                <span>Certifications</span>
              </Link>
              <Link
                to="/notifications"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/notifications' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/notifications')}
              >
                <FaCertificate />
                <span>Notifications</span>
              </Link>
            </>
          )}
          {/* SuperAdmin-specific menu items */}
          {role === 'admin' && (
            <>
              <Link
                to="/users"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/users' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/users')}
              >
                <FaUsers />
                <span>Users</span>
              </Link>
              <Link
                to="/questions"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/questions' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/questions')}
              >
                <FaRegQuestionCircle />
                <span>Questions Setting</span>
              </Link>
              <Link
                to="/organization"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/organization' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/organization')}
              >
                <RiOrganizationChart />
                <span>Organization</span>
              </Link>
              <Link
                to="/certifications"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/certifications' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/certifications')}
              >
                <FaCertificate />
                <span>Certifications</span>
              </Link>
              <Link
                to="/notifications"
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
                  activeLink === '/notifications' ? 'bg-button' : ''
                }`}
                onClick={() => handleLinkClick('/notifications')}
              >
                <FaCertificate />
                <span>Notifications</span>
              </Link>
            </>
          )}
          <Link
            to="/logout"
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-button ${
              activeLink === '/logout' ? 'bg-button' : ''
            }`}
            onClick={() => handleLinkClick('/logout')}
          >
            <MdLogout />
            <span>Logout</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Sidebar;
