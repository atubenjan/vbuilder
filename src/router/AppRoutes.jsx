import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Sidebar from '../components/Sidebar';
import Users from '../pages/Users';
import AiAssistant from '../pages/AiAssistant';
import QuestionsSetting from '../pages/QuestionsSetting';
import { ProjectProvider } from '../contexts/ProjectContext';
import Organization from '../pages/Organization';

const AppRoutes = () => {
  return (
    <ProjectProvider>
      <Router>
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-grow overflow-y-auto md:ml-60">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/questions" element={<QuestionsSetting />} />
              <Route path="/aiassistant" element={<AiAssistant />} />            
              <Route path="/organization" element={<Organization />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ProjectProvider>
  );
};

export default AppRoutes;
