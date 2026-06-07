import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, BookmarkIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('bookmarks'); // clear bookmark cache on logout
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between relative shadow-md">
      {/* Left Section — user avatar */}
      <div className="flex-1">
        {user && (
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg border-2 border-gray-600">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="text-white hidden md:block">
              <span className="block text-sm font-semibold">{user.name || 'User'}</span>
              <span className="block text-xs text-gray-400">{user.email || 'No email'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Middle Section — brand */}
      <div className="flex-1 flex justify-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="hover:text-blue-300 transition-colors duration-300">
            Terna News
          </Link>
        </div>
      </div>

      {/* Right Section — desktop nav */}
      <div className="flex-1 flex justify-end items-center">
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
          >
            Home
          </Link>

          <Link
            to="/hot-news"
            className="relative bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 text-sm font-medium animate-pulse shadow-lg shadow-red-500/50"
          >
            Hot News
            <div className="absolute inset-0 bg-yellow-400 opacity-60 rounded-md blur-lg -z-10"></div>
          </Link>

          {user && (
            <Link
              to="/bookmarks"
              className="flex items-center gap-1.5 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
            >
              <BookmarkIcon className="h-4 w-4" />
              Bookmarks
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
            >
              Sign In/Sign Up
            </Link>
          )}
        </div>

        {/* Hamburger — mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 w-full rounded-b-md shadow-lg flex flex-col items-center space-y-2 py-4 md:hidden z-20">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-white px-4 py-2 hover:bg-gray-700 rounded w-11/12 text-center">
            Home
          </Link>
          <Link to="/hot-news" onClick={() => setIsOpen(false)} className="block text-white px-4 py-2 hover:bg-gray-700 rounded w-11/12 text-center">
            Hot News
          </Link>
          {user && (
            <Link to="/bookmarks" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-1.5 text-white px-4 py-2 hover:bg-gray-700 rounded w-11/12 text-center">
              <BookmarkIcon className="h-4 w-4" />
              Bookmarks
            </Link>
          )}
          {user ? (
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="block text-white px-4 py-2 hover:bg-gray-700 rounded w-11/12 text-center"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block text-white px-4 py-2 hover:bg-gray-700 rounded w-11/12 text-center">
              Sign In/Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;