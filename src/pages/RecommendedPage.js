import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Article from '../components/Article';

const RecommendedPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to see recommendations.');
        setLoading(false);
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
  }, []);

  if (loading) return <div className="text-center p-10">Generating your recommendations...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">✨ Recommended For You</h1>
          <p className="text-gray-600 mt-2">These articles are recommended for you based on your ratings.</p>
        </div>

        {recommendations.length > 0 ? (
          recommendations.map((item) => (
            <Article key={item._id} newsItem={item} />
          ))
        ) : (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">No recommendations available yet. Start rating articles to get personalized suggestions!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedPage;
