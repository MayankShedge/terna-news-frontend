import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/solid';

const API_URL = process.env.REACT_APP_API_URL || 'https://terna-news-backend.onrender.com';

const Article = ({ newsItem, onUnbookmark }) => {
  const { _id, title, description, source, publishedAt, averageRating, numReviews, views } = newsItem;
  const [ratingMessage, setRatingMessage] = useState('');
  const [isLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    if (!isLoggedIn) return;
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      const bookmarks = JSON.parse(saved);
      setIsBookmarked(bookmarks.includes(_id));
    }
  }, [_id, isLoggedIn]);

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

  const handleBookmark = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setBookmarkLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/news/${_id}/bookmark`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const nowBookmarked = response.data.bookmarked;
      setIsBookmarked(nowBookmarked);

      if (!nowBookmarked && onUnbookmark) {
        onUnbookmark(_id);
      }

      const saved = localStorage.getItem('bookmarks');
      let bookmarks = saved ? JSON.parse(saved) : [];
      if (nowBookmarked) {
        bookmarks = [...new Set([...bookmarks, _id])];
      } else {
        bookmarks = bookmarks.filter((id) => id !== _id);
      }
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Bookmark error:', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200 transition-shadow duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 className="text-2xl font-bold text-gray-800">
            <Link
              to={`/news/${_id}`}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {title}
            </Link>
          </h2>

          {isLoggedIn && (
            <button
              onClick={handleBookmark}
              disabled={bookmarkLoading}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
              className="flex-shrink-0 mt-1 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
            >
              {isBookmarked ? (
                <BookmarkSolid className="h-6 w-6 text-blue-500" />
              ) : (
                <BookmarkOutline className="h-6 w-6 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
              )}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-500 mb-4">
          <span>Source: <strong>{source}</strong></span>
          <span className="text-gray-300">|</span>
          <span>Published on: {formattedDate}</span>
          <span className="text-gray-300">|</span>
          <span>{views ?? 0} views</span>
        </div>

        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-3 sm:mb-0">
            Average Rating: <strong>{averageRating?.toFixed(1) ?? '0.0'}</strong> ({numReviews} reviews)
          </div>

          {isLoggedIn && (
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-1">Rate this article:</span>
              <StarRating onRatingSubmit={handleRatingSubmit} />
            </div>
          )}
        </div>

        {ratingMessage && (
          <p className="text-center text-sm text-blue-600 mt-3">{ratingMessage}</p>
        )}
      </div>
    </article>
  );
};

export default Article;