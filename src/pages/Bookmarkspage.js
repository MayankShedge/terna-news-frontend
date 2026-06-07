import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Article from '../components/Article';

const API_URL = process.env.REACT_APP_API_URL || 'https://terna-news-backend.onrender.com';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view your bookmarks.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/news/bookmarks/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookmarks(response.data);

        // Sync localStorage bookmark cache with what the server returns
        const ids = response.data.map((item) => item._id);
        localStorage.setItem('bookmarks', JSON.stringify(ids));
      } catch (err) {
        setError('Could not fetch your bookmarks at this time.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleUnbookmark = (removedId) => {
    setBookmarks((prev) => prev.filter((item) => item._id !== removedId));
  };

  if (loading) return <div className="text-center p-10 text-gray-600">Loading your bookmarks...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">🔖 My Bookmarks</h1>
          <p className="text-gray-600 mt-2">
            {bookmarks.length > 0
              ? `You have ${bookmarks.length} saved ${bookmarks.length === 1 ? 'article' : 'articles'}.`
              : 'Articles you bookmark will appear here.'}
          </p>
        </div>

        {bookmarks.length > 0 ? (
          bookmarks.map((item) => (
            <Article
              key={item._id}
              newsItem={item}
              onUnbookmark={handleUnbookmark}
            />
          ))
        ) : (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg mb-2">No bookmarks yet.</p>
            <p className="text-gray-400 text-sm">
              Hit the bookmark icon on any article to save it here for later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;