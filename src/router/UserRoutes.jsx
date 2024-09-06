import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../pages/Home';
import Users from '../pages/Users';
import QuestionsSetting from '../pages/QuestionsSetting';
import Notifications from '../pages/Notifications';
import Logout from '../pages/Logout';
import Organization from '../pages/Organization';
import Subscription from '../pages/Subscription';
import AiAssistant from '../pages/AiAssistant';
import Certifications from '../pages/Certifications';
import UserSidebar from '../components/UserSidebar';

const UserRoutes = ({ onLogout }) => {
  return (
    <Router>
      <div className="flex w-full">
        <UserSidebar />
        <div className="flex-grow overflow-y-auto md:ml-60">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/questions" element={<QuestionsSetting />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/aiassistant" element={<AiAssistant />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/logout" element={<Logout onLogout={onLogout} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

UserRoutes.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default UserRoutes;
