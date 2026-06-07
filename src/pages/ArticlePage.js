import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Article from '../components/Article';

const API_URL = process.env.REACT_APP_API_URL || 'https://terna-news-backend.onrender.com';

const ArticlePage = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/news/${id}`);
        setNewsItem(response.data);
      } catch (err) {
        setError('Failed to load article.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center p-10">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!newsItem) {
    return <div className="text-center p-10 text-red-500">Article not found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Article newsItem={newsItem} />
      </div>
    </div>
  );
};

export default ArticlePage;