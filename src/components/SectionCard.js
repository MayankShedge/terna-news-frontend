import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/solid';

const SectionCard = ({ title, imgSrc, link }) => {
  const navigate = useNavigate();

  // The component now takes a direct 'link' prop for robust navigation
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <motion.div
      className="group rounded-xl overflow-hidden shadow-lg cursor-pointer 
                 border border-white/20 bg-white/10 backdrop-blur-md 
                 transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
    >
      <div className="overflow-hidden">
        <img 
          src={imgSrc} 
          alt={title} 
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110" 
        />
      </div>
      <div className="p-5 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <ArrowRightIcon className="h-6 w-6 text-white transform transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
};

export default SectionCard;
