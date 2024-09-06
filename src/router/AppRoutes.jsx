import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import Users from '../pages/Users';
import AiAssistant from '../pages/AiAssistant';
import QuestionsSetting from '../pages/QuestionsSetting';
import { ProjectProvider } from '../contexts/ProjectContext';
import Organization from '../pages/Organization';
import Analytics from '../pages/Analytics';
import Subscription from '../pages/Subscription';
import Logout from '../pages/Logout';
import Certifications from '../pages/Certifications';
import Notifications from '../pages/Notifications';
import Home from '../pages/Home';

const AppRoutes = ({ onLogout }) => {
  return (
    <ProjectProvider>
      <Router>
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-grow overflow-y-auto md:ml-60">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/questions" element={<QuestionsSetting />} />
              <Route path="/organization" element={<Organization />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/aiassistant" element={<AiAssistant />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/logout" element={<Logout onLogout={onLogout} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ProjectProvider>
  );
};

AppRoutes.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default AppRoutes;
