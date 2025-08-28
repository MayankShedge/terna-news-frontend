import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  // userType is not sent to the backend anymore, but we can keep the state if you plan to use it for UI changes.
  const [userType, setUserType] = useState('user'); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/';
    } catch (error) {
      // --- CHANGE 1: More specific error message for unverified users ---
      if (error.response && error.response.status === 401) {
        setErrorMessage('Please verify your email before logging in.');
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
      console.error(error.response?.data || error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        adminCode,
      });

      // --- CHANGE 2: Update success message and clear the form ---
      // We no longer auto-login or redirect from here.
      setSuccessMessage('Registration successful! Please check your email to verify your account.');
      
      // Clear form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setAdminCode('');

    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-green-300">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-lg overflow-hidden">
        
        {/* Sign In Form */}
        <div className={`p-8 ${isSignUp ? 'hidden' : ''}`}>
          <form className="flex flex-col items-center justify-center" onSubmit={handleSignIn}>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <div className="flex space-x-4 mb-4">
              {[FaFacebook, FaTwitter, FaLinkedin, FaGoogle].map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  className="border border-gray-300 rounded-full p-2 flex items-center justify-center"
                >
                  <Icon />
                </button>
              ))}
            </div>
            <span className="mb-2">or use your email for sign in</span>
            <input
              type="email"
              placeholder="Email"
              required
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* Dropdown removed from Sign In form as it's not needed for login */}

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && !isSignUp && <p className="text-green-500 mb-4">{successMessage}</p>}

            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 cursor-pointer animate-pulse shadow-lg shadow-red-500/50 w-1/4"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div className={`p-8 ${!isSignUp ? 'hidden' : ''}`}>
          <form className="flex flex-col items-center justify-center" onSubmit={handleSignUp}>
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <div className="flex space-x-4 mb-4">
              {[FaFacebook, FaTwitter, FaLinkedin, FaGoogle].map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  className="border border-gray-300 rounded-full p-2 flex items-center justify-center"
                >
                  <Icon />
                </button>
              ))}
            </div>
            <span className="mb-2">or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              required
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <input
              type="text"
              placeholder="Admin Code (Optional)"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />

            {/* --- CHANGE 3: Show success message on the sign-up form --- */}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && isSignUp && <p className="text-green-500 mb-4">{successMessage}</p>}

            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 cursor-pointer animate-pulse shadow-lg shadow-red-500/50 w-1/4"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-between absolute bottom-0 left-0 right-0">
          <button
            onClick={() => {
              setIsSignUp(false);
              setErrorMessage(''); // Clear messages on toggle
              setSuccessMessage('');
            }}
            className={`flex-1 text-center py-1 ${!isSignUp ? 'font-bold' : ''} bg-orange-300 text-black`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsSignUp(true);
              setErrorMessage(''); // Clear messages on toggle
              setSuccessMessage('');
            }}
            className={`flex-1 text-center py-1 ${isSignUp ? 'font-bold' : ''} bg-orange-300 text-black`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
