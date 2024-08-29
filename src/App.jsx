import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import { ProjectProvider } from './contexts/ProjectContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './components/LandingPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ProjectProvider>
      <div className="w-full h-full">
        {isLoggedIn ? (
          <AppRoutes onLogout={handleLogout} />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        )}
      </div>
    </ProjectProvider>
  );
};

export default App;
