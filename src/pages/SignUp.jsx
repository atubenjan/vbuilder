import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError('An error occurred during signup. Please try again.' + err);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen px-4 bg-gray-100">
      <div className="w-full md:w-4/5 mx-auto flex justify-center items-center gap-0 h-full">
        <div className="h-[61%] w-1/2 hidden lg:block relative rounded-l-lg overflow-hidden">
          <img
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yNl8zZF9pbGx1c3RyYXRpb25fb2ZfYV9ib3lfc2l0dGluZ19vbl90aGVfZmxvb18zMjc1NTFkMC1mMzRiLTQ3NzItYjg4YS1hOGM5Yzg2ODFiMzFfMS5qcGc.jpg"
            alt="Learner"
            className="w-full hidden md:block h-full object-cover rounded-l-lg object-center"
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label className="absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label className="absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label className="absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-4 py-2 text-base bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label className="absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm Password
            </label>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-10 py-2 text-white rounded-lg hover:bg-slate-300 hover:text-black bg-slate-500"
            >
              Sign Up
            </button>
          </div>
          <div className="py-5">
            Already have an account?
            <button
              className="px-5 py-2 ml-3 rounded-lg hover:bg-slate-500 hover:text-white bg-slate-200"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
