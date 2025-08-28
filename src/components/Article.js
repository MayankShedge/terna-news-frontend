import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

// Define the live backend URL
const API_URL = 'https://terna-news-backend.onrender.com';

const Article = ({ newsItem }) => {
  const { _id, title, description, source, publishedAt, averageRating, numReviews } = newsItem;
  const [ratingMessage, setRatingMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleRatingSubmit = async (rating) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setRatingMessage('You must be logged in to rate an article.');
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/news/${_id}/rate`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRatingMessage('Thank you for your feedback!');
    } catch (error) {
      setRatingMessage(error.response?.data?.message || 'Failed to submit rating.');
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200 transition-shadow duration-300 hover:shadow-xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <div className="text-sm text-gray-500 mb-4">
          <span>Source: <strong>{source}</strong></span> | <span>Published on: {formattedDate}</span>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-3 sm:mb-0">
            Average Rating: <strong>{averageRating.toFixed(1)}</strong> ({numReviews} reviews)
          </div>
          
          {isLoggedIn && (
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-1">Rate this article:</span>
              <StarRating onRatingSubmit={handleRatingSubmit} />
            </div>
          )}
        </div>
        {ratingMessage && <p className="text-center text-sm text-blue-600 mt-3">{ratingMessage}</p>}
      </div>
    </article>
  );
};

export default Article;
