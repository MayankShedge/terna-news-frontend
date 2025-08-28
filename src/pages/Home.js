import React, { useState, useEffect } from 'react';
import SectionCard from '../components/SectionCard';
import placementImage from '../assets/placement.png';
import techEvent from '../assets/techEvents.jpeg';
import culturalEvent from '../assets/culturalEvents.jpeg';
import cutoffImage from '../assets/cutoff.jpeg';
// Using a placeholder for the new card, you can replace this with a real image
import recommendedImage from '../assets/recommendedImage.jpg'; 

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('/college-bg.jpg')` }}
    >
      <div className="min-h-screen w-full bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Welcome to Terna News
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-3xl mx-auto drop-shadow-md">
              Your official portal for all campus updates, events, and announcements.
            </p>
          </header>

          {/* News Category Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SectionCard title="Placement News" imgSrc={placementImage} link="/placement-news" />
            <SectionCard title="Tech Event News" imgSrc={techEvent} link="/tech-event-news" />
            <SectionCard title="Cultural Event News" imgSrc={culturalEvent} link="/cultural-event-news" />
            <SectionCard title="Cutoffs & Related News" imgSrc={cutoffImage} link="/cutoffs-and-related-news" />
            
            {/* --- THIS IS THE NEW PART --- */}
            {/* Conditionally render the recommendations card only if a user is logged in */}
            {user && (
              <SectionCard title="Recommended For You" imgSrc={recommendedImage} link="/recommended-for-you" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
