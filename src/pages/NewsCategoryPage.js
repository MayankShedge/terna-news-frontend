import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Article from '../components/Article';
import AddNewsForm from '../components/AddNewsForm';

// Define the live backend URL
const API_URL = 'https://terna-news-backend.onrender.com';

const NewsCategoryPage = ({ category, pageTitle }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/news?category=${category}`);
      setNews(response.data);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.isAdmin) {
        setIsAdmin(true);
      }
    }
    fetchNews();
  }, [category]);

  const handleNewsAdded = (newArticle) => {
    setNews([newArticle, ...news]);
    setShowAddForm(false);
  };

  if (loading) return <div className="text-center p-10">Loading news...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              {showAddForm ? 'Cancel' : `+ Add News`}
            </button>
          )}
        </div>

        {isAdmin && showAddForm && (
          <AddNewsForm category={category} onNewsAdded={handleNewsAdded} />
        )}

        {news.length > 0 ? (
          news.map((item) => (
            <Article
              key={item._id}
              newsItem={item}
            />
          ))
        ) : (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">No news available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCategoryPage;
