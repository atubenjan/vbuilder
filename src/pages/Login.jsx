import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login
    onLogin();
    navigate('/home');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center h-screen px-4 bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-6 text-2xl font-bold">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg outline-none"
          />
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-10 py-2 text-white rounded-lg hover:bg-slate-300 hover:text-black bg-slate-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="py-5">
          <div>
            Don&apos;t Have Account?
            <button
              className="px-5 py-2 ml-3 rounded-lg hover:bg-slate-500 hover:text-white bg-slate-200"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
