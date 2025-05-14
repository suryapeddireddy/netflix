import React, { useState, useEffect } from 'react';
import { popular } from '../Requests';
import axios from 'axios';

const Main = () => {
  const [currentMovie, setCurrentMovie] = useState({
    backdrop_path: '',
    title: '',
    overview: '',
    release_date: ''
  });

  useEffect(() => {
    const getCurrentMovie = async () => {
      try {
        const res = await axios.get(popular, {
          withCredentials: false // Explicitly disable sending credentials
        });
        const results = res.data.results;

        if (results && results.length > 0) {
          const randomMovie = results[Math.floor(Math.random() * results.length)];
          setCurrentMovie({
            backdrop_path: `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`,
            title: randomMovie.title,
            overview: randomMovie.overview,
            release_date: randomMovie.release_date
          });
        }
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };

    getCurrentMovie();
  }, [popular]); // Added 'popular' to the dependency array

  return (
    <div className="w-full h-[500px] relative">
      {/* Background Image */}
      <img
        src={currentMovie.backdrop_path}
        alt={currentMovie.title}
        className="h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-black/70" />

      {/* Content */}
      <div className="absolute top-1/4 left-4 md:left-12 max-w-[90%] md:max-w-[60%] text-white space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold">{currentMovie.title}</h1>

        <p className="text-sm md:text-base text-gray-200">
          <span className="font-semibold text-white">Released:</span> {currentMovie.release_date}
        </p>

        <p className="md:block text-sm md:text-base text-gray-300 leading-relaxed">
          {currentMovie.overview.length > 200
            ? currentMovie.overview.slice(0, 200) + '...'
            : currentMovie.overview}
        </p>

        <div className="flex gap-4 pt-4">
          <button className="px-6 py-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition">
            ▶ Play
          </button>
          <button className="px-6 py-2 rounded bg-gray-700 text-white font-semibold hover:bg-gray-600 transition">
            + Watch Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;