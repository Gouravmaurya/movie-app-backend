import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const McuMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/movies/mcu-movies"
        );
        console.log(data); // Check what the API returns
        setMovies(data.data); // Adjust this based on your API response
      } catch (err) {
        console.error("Error fetching MCU movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const phases = [null, ...new Set(movies.map(movie => movie.phase))].sort((a, b) => {
    if (a === null) return -1;
    if (b === null) return 1;
    return a - b;
  });

  const filteredMovies = selectedPhase
    ? movies.filter(movie => movie.phase === selectedPhase)
    : movies;

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`); // Ensure the dynamic route matches the one defined in App.js
  };

  return (
    <div className="bg-black p-12">
      <motion.div 
        className="flex justify-center items-center h-80 m-20"
        initial={{ opacity: 0, y: -50 }} // Initial state for animation
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        transition={{ duration: 0.5 }} // Duration of the animation
      >
        <div className="w-1/2 h-full m-8 flex">
          <img
            className="w-full h-full"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Marvel_Cinematic_Universe_logo.png/1200px-Marvel_Cinematic_Universe_logo.png"
            alt="Marvel Cinematic Universe Logo"
          />
        </div>
      </motion.div>

      <div className="mb-8 flex justify-center flex-wrap">
        {phases.map(phase => (
          <button
            key={phase}
            onClick={() => setSelectedPhase(phase)}
            className={`mr-2 mb-2 px-4 py-2 rounded-md font-semibold transition-colors
              ${selectedPhase === phase 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {phase === null ? 'All Phases' : `Phase ${phase}`}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              className="max-w w-60 rounded-md overflow-hidden shadow-lg bg-zinc-800 text-white hover:bg-zinc-700 hover:text-gray-400 hover:scale-105 transition-transform ease-linear"
              onClick={() => handleCardClick(movie.id)} // Handle card click
              initial={{ opacity: 0, scale: 0.8 }} // Initial state for animation
              animate={{ opacity: 1, scale: 1 }} // Animate to this state
              transition={{ duration: 0.3 }} // Duration of the animation
            >
              <img
                src={movie.cover_url}
                alt={movie.title}
                className="w-full h-80 object-cover object-center rounded-lg p-1 transition-transform ease-in-out duration-100"
              />
              <div className="px-6 py-2">
                <h3 className="font-bold text-xl mb-2 text-wrap">
                  {movie.title}
                </h3>
                <p className="text-gray-500 text-sm pb-2 ">
                  Release Date: {movie.release_date}
                </p>
                <p className="text-gray-500 text-sm pb-2cd ">
                  Phase: {movie.phase}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default McuMovies;
