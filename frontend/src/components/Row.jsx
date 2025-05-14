import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(fetchURL, {
          withCredentials: false // Explicitly disable sending credentials
        });
        setMovies(res.data.results);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    getMovies();
  }, [fetchURL]);

  // Scroll handler
  const slide = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 500;

    if (direction === "left") {
      slider.scrollLeft -= scrollAmount;
    } else {
      slider.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="mb-8 group relative">
      {/* Title */}
      <h2 className="font-bold text-white text-lg md:text-2xl px-4 mb-2">
        {title}
      </h2>

      {/* Left Arrow */}
      <FaChevronLeft
        onClick={() => slide("left")}
        className="text-white hidden group-hover:block absolute left-4 top-[50%] -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 cursor-pointer"
        size={40}
      />

      {/* Movie Row */}
      <div
        ref={sliderRef}
        className="relative flex overflow-x-scroll gap-2 px-4 scrollbar-hide scroll-smooth"
        id={`slider-${rowID}`}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[200px] md:min-w-[250px] h-[140px] rounded overflow-hidden hover:scale-105 transition duration-300 ease-in-out"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <FaChevronRight
        onClick={() => slide("right")}
        className="text-white hidden group-hover:block absolute right-4 top-[50%] -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 cursor-pointer"
        size={40}
      />
    </div>
  );
};

export default Row;

// The Home component doesn't directly make the API call, so no immediate correction is needed there.
// However, ensure that the 'fetchURL' prop passed to the Row component in Home.jsx is the correct API endpoint.