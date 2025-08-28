import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Article from '../components/Article';

const HotNews = () => {
  const [hotNews, setHotNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotNews = async () => {
      try {
        // Fetch all news articles from the backend
        const response = await axios.get('http://localhost:5000/api/news');
        
        // Filter the news to find articles with an average rating > 4
        const filteredNews = response.data.filter(
          (item) => item.averageRating > 4
        );

        // Sort the hot news to show the highest rated first
        filteredNews.sort((a, b) => b.averageRating - a.averageRating);

        setHotNews(filteredNews);
      } catch (err) {
        setError('Failed to fetch hot news. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotNews();
  }, []); // The empty array ensures this runs only once on component mount

  if (loading) return <div className="text-center p-10">Finding the hottest news...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">🔥 Hot News</h1>
          <p className="text-gray-600 mt-2">Here are the top-rated articles, based on user feedback.</p>
        </div>

        {hotNews.length > 0 ? (
          hotNews.map((item) => (
            <Article key={item._id} newsItem={item} />
          ))
        ) : (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">No articles have reached "Hot News" status yet. Be the first to rate them!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotNews;
