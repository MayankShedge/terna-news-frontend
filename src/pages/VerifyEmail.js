import React, { useEffect, useState, useRef } from 'react'; // 1. Import useRef
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your email, please wait...');
  const { token } = useParams();
  
  // 2. Create a ref to track if verification has been attempted
  const verificationAttempted = useRef(false);

  useEffect(() => {
    // 3. Prevent the effect from running more than once
    if (verificationAttempted.current) {
      return;
    }
    verificationAttempted.current = true; // Mark as attempted

    if (!token) {
      setStatus('error');
      setMessage('Verification link is invalid or missing.');
      return;
    }

    const verifyUserEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/verify/${token}`);
        setStatus('success');
        setMessage(response.data.message);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed. The link may have expired.');
      }
    };

    verifyUserEmail();
  }, [token]); // The effect still depends on the token

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl text-center max-w-md">
        {status === 'verifying' && (
          <div className="animate-pulse text-2xl font-semibold text-gray-700">
            {message}
          </div>
        )}
        {status === 'success' && (
          <div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">Success!</h1>
            <p className="text-gray-800 mb-6">{message}</p>
            <Link 
              to="/login" 
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Proceed to Login
            </Link>
          </div>
        )}
        {status === 'error' && (
          <div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Verification Failed</h1>
            <p className="text-gray-800 mb-6">{message}</p>
            <Link 
              to="/register" 
              className="text-blue-600 hover:underline"
            >
              Try signing up again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
