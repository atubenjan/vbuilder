import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import { ProjectProvider } from './contexts/ProjectContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './components/LandingPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  // Fetch role and login status from localStorage on app load
  useEffect(() => {
    const storedUserRole = localStorage.getItem('role');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    setIsLoggedIn(storedIsLoggedIn);
    if (storedUserRole) {
      setRole(storedUserRole);
    }
  }, []);

  // Handle login action
  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Handle logout action
  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  };

  return (
    <ProjectProvider>
      <div className="w-full h-full">
        {isLoggedIn ? (
          <AppRoutes onLogout={handleLogout} role={role} />
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
