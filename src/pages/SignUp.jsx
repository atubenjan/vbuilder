import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const Signup = ({ logo }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    organization: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    } else if (user.password.length < 6) {
      setError('Password must be at least 6 characters long');
    }

    try {
      const lowerCaseUser = { ...user, username: user.username.toLowerCase() };

      await axios.post('http://localhost:5000/users', lowerCaseUser);
      alert('User created successfully');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Email already exists. Please use a different email.');
      } else {
        setError(
          'An error occurred during signup. Please try again. ' + err.message,
        );
      }
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-4 bg-background">
      <div className="flex items-center justify-center w-full gap-0 mx-auto h-fit md:w-4/5">
        <div className="w-full lg:flex lg:flex-row">
          {/* Image Container */}
          <div className="hidden w-full h-full lg:flex lg:w-1/2 lg:h-auto">
            <img
              src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yNl8zZF9pbGx1c3RyYXRpb25fb2ZfYV9ib3lfc2l0dGluZ19vbl90aGVfZmxvb18zMjc1NTFkMC1mMzRiLTQ3NzItYjg4YS1hOGM5Yzg2ODFiMzFfMS5qcGc.jpg"
              alt="Learner"
              className="object-cover w-full h-auto rounded-l-lg lg:h-auto"
            />
          </div>
          {/* Form Container */}
          <div className="w-full p-4 bg-white rounded-lg shadow-lg lg:w-1/2 lg:rounded-r-lg lg:rounded-l-none">
            <form onSubmit={handleSubmit} className="w-full h-full">
              <div className="flex items-center justify-center w-full h-fit">
                <img src={logo} alt="VBuilder Logo" className="w-1/2 h-auto" />
              </div>
              <h2 className="py-6 text-base text-center">
                Register to Get Started with VBuilder
              </h2>

              {error && <div className="mb-4 text-red-500">{error}</div>}

              <div className="relative mb-2">
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Username"
                  required
                />
              </div>

              {/* Role Select Field with Label */}
              <div className="relative mb-2">
                <label
                  htmlFor="role"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Register As:
                </label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="user">User</option>
                  <option value="organization">Organization</option>
                </select>
              </div>

              <div className="relative mb-2">
                <input
                  type="text"
                  name="organization"
                  value={user.organization}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Organization"
                />
              </div>

              <div className="relative mb-2">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="relative mb-2">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="relative mb-2">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div className="flex items-center w-full justify-left">
                <button
                  type="submit"
                  className="w-1/2 py-2 font-bold text-white rounded bg-button hover:bg-amber-600"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex items-center w-full pt-2 text-base justify-left">
                <span className="pr-5">Already Have an Account?</span>
                <button
                  type="submit"
                  className="px-5 py-1 text-black hover:underline"
                  onClick={() => handleLogin()}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default Signup;
