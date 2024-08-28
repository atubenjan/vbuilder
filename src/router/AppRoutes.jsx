import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Users from '../pages/Users';
import AiAssistant from '../pages/AiAssistant';
import QuestionsSetting from '../pages/QuestionsSetting';
import { ProjectProvider } from '../contexts/ProjectContext';
import Organization from '../pages/Organization';
import MCQPage from '../components/MCQPage';
import TrueFalsePage from '../components/TrueFalsePage';
import Home from '../pages/Home';
import Analytics from '../pages/Analytics';

const AppRoutes = () => {
  return (
    <ProjectProvider>
      <Router>
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-grow overflow-y-auto md:ml-60">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/questions" element={<QuestionsSetting />} />
              <Route path="/organization" element={<Organization />}>
                <Route index element={<MCQPage />} />
                <Route path="mcq" element={<MCQPage />} />
                <Route path="truefalse" element={<TrueFalsePage />} />
              </Route>
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/aiassistant" element={<AiAssistant />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ProjectProvider>
  );
};

export default AppRoutes;
