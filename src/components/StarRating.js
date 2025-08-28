import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    onRatingSubmit(ratingValue);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              className="hidden" // Hide the actual radio button
            />
            <FaStar
              className="cursor-pointer"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
