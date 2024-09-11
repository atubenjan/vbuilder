import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    organization: '',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    } else if (user.password.length < 6) {
      setError('Password must be at least 6 characters long');
    }

    try {
      // Ensure username is stored in lowercase
      const lowerCaseUser = { ...user, username: user.username.toLowerCase() };

      await axios.post('http://localhost:5000/users', lowerCaseUser);
      alert('User created successfully');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Email already exists. Please use a different email.');
      } else {
        setError(
          'An error occurred during signup. Please try again. ' + err.message
        );
      }
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.name === 'username' ? e.target.value.toLowerCase() : e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen px-4 bg-gray-100">
      <div className="flex items-center justify-center w-full h-full gap-0 mx-auto md:w-4/5">
        <div className="h-[61%] w-1/2 hidden lg:block relative rounded-l-lg overflow-hidden">
          <img
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yNl8zZF9pbGx1c3RyYXRpb25fb2ZfYV9ib3lfc2l0dGluZ19vbl90aGVfZmxvb18zMjc1NTFkMC1mMzRiLTQ3NzItYjg4YS1hOGM5Yzg2ODFiMzFfMS5qcGc.jpg"
            alt="Learner"
            className="hidden object-cover object-center w-full h-full rounded-l-lg md:block"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 w-[99%] mx-auto md:w-3/5 lg:w-1/2 bg-white rounded-lg lg:rounded-r-lg lg:rounded-l-none shadow-lg"
        >
          <h2 className="mb-6 text-2xl font-bold">Sign Up</h2>

          {error && <div className="mb-4 text-red-500">{error}</div>}

          <div className="relative mb-6">
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

          <div className="relative mb-6">
            <input
              type="text"
              name="organization"
              value={user.organization}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Organization"
              required
            />
          </div>

          <div className="relative mb-6">
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

          <div className="relative mb-6">
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

          <div className="relative mb-6">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
