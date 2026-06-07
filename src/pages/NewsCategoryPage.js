import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Article from '../components/Article';
import AddNewsForm from '../components/AddNewsForm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const NewsCategoryPage = ({ category, pageTitle }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchNews = useCallback(async (pageToFetch = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/news?category=${category}&page=${pageToFetch}&limit=10`
      );

      setNews(response.data.news);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    fetchNews(currentPage);
  }, [fetchNews, currentPage]);

  const handleNewsAdded = (newArticle) => {
    setShowAddForm(false);

    if (currentPage === 1) {
      setNews((prev) => {
        const updated = [newArticle, ...prev];
        return updated.slice(0, pagination?.limit || 10);
      });

      setPagination((prev) => {
        if (!prev) return prev;

        const updatedTotal = prev.total + 1;
        const updatedTotalPages = Math.max(1, Math.ceil(updatedTotal / prev.limit));

        return {
          ...prev,
          total: updatedTotal,
          totalPages: updatedTotalPages,
          hasNextPage: prev.page < updatedTotalPages,
          hasPrevPage: prev.page > 1,
        };
      });
    } else {
      setCurrentPage(1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.hasPrevPage) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
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
          <>
            {news.map((item) => (
              <Article key={item._id} newsItem={item} />
            ))}

            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={handlePrevPage}
                  disabled={!pagination.hasPrevPage}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-sm font-medium text-gray-700">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage}
                  className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
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