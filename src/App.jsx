import React, {
  useState,
  // useEffect
} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import { ProjectProvider } from './contexts/ProjectContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './components/LandingPage';
// import UserRoutes from './router/UserRoutes';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [role, setRole] = useState(null);

  // useEffect(() => {
  //   const storedUserRole = localStorage.getItem('role');
  //   const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  //   setIsLoggedIn(storedIsLoggedIn);
  //   if(storedUserRole){
  //     setRole(storedUserRole)
  //   }
  // }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // setRole(role);
    // localStorage.setItem('isLoggedIn', 'true');
    // localStorage.setItem('role', role);
  };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setRole(null);
  //   localStorage.removeItem('isLoggedIn');
  //   localStorage.removeItem('role');
  // };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const role = 'admin';

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

// import React from 'react';
// import MCQComponent from './components/MCQComponent';

// const App = () => {
//   const question = 'What is the capital of France?';
//   const options = ['Paris', 'London', 'Rome', 'Berlin'];
//   const correctOption = 'Paris';

//   return (
//     <div className='w-full h-screen flex justify-center py-5'>
//       <MCQComponent
//         question={question}
//         options={options}
//         correctOption={correctOption}
//       />
//     </div>
//   );
// };

// export default App;
