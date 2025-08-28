import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Article from './Article'; // We'll reuse your Article component

const RecommendedNews = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // Get the token from localStorage to make an authenticated request
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        // Don't show an error, just don't fetch if not logged in.
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/news/recommendations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecommendations(response.data);
      } catch (err) {
        setError('Could not fetch recommendations at this time.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []); // Empty array ensures this runs only once

  // Don't render anything if loading, error, or no recommendations
  if (loading || error || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
        Recommended For You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recommendations.map((item) => (
          <Article key={item._id} newsItem={item} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedNews;
