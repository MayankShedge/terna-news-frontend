import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto py-8 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Side: Logo/Title */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white">Terna News</h2>
            <p className="text-sm">Your Campus News Portal</p>
          </div>

          {/* Middle: Copyright */}
          <div className="text-center text-sm mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} ternaengg.ac.in | All rights reserved</p>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex space-x-4">
            <a href="https://twitter.com/ternaengg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="https://facebook.com/ternaengg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>
            <a href="https://linkedin.com/school/ternaengg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
