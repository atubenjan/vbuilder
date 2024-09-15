import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Login = ({ onLogin, logo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      const { token, userId, username, role, organization } = response.data;

      // Store the JWT token, user ID, username, and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', username);
      localStorage.setItem('role', role);
      localStorage.setItem('organization', organization);

      // Call the onLogin function and pass the userRole
      onLogin(role);

      // Navigate to the home page
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.response ? error.response.data.message : 'An error occurred',
      );
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center w-full h-screen px-4 py-20 bg-background">
      <div className="flex items-center justify-center w-full h-full gap-0 mx-auto md:w-4/5">
        {/* Image container */}
        <div className="relative hidden w-1/2 h-full overflow-hidden rounded-l-lg lg:block">
          <img
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yNl8zZF9pbGx1c3RyYXRpb25fb2ZfYV9ib3lfc2l0dGluZ19vbl90aGVfZmxvb18zMjc1NTFkMC1mMzRiLTQ3NzItYjg4YS1hOGM5Yzg2ODFiMzFfMS5qcGc.jpg"
            alt="Learner"
            className="object-cover object-center w-full h-full rounded-l-lg"
          />
        </div>

        {/* Form container */}
        <form
          onSubmit={handleSubmit}
          className="p-4 w-[99%] mx-auto md:w-3/5 lg:w-1/2 bg-white h-full rounded-lg lg:rounded-r-lg lg:rounded-l-none shadow-lg flex flex-col justify-center"
        >
          <div className="flex items-center justify-center w-full pt-5 h-fit">
            <img src={logo} alt="VBuilder Logo" className="w-1/2 h-auto" />
          </div>
          <h2 className="py-6 text-xl font-medium text-center">
            Welcome back to VBuilder
          </h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <div className="relative mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 pr-10 text-base bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-600 right-3 top-3"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-10 py-2 text-white rounded-lg hover:bg-amber-600 hover:text-black bg-button"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-between py-5">
            <button
              className="px-5 py-1 text-black hover:underline"
              onClick={handleSignUp}
            >
              Register Here
            </button>
            <button
              className="px-5 py-1 text-black hover:underline"
              onClick={() => alert('In progress')}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired,
};

export default Login;
