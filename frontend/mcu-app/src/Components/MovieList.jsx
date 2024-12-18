import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const { data } = await axios.get(`http://localhost:3000/api/movies/mcu-movies`);
        
        // Find the movie details by id
        const movieDetails = data.data.find((movie) => movie.id === parseInt(id));
        
        if (movieDetails) {
          setMovie(movieDetails);
        } else {
          console.error("Movie not found");
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    // Check if the movie is in the wishlist
    const checkWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:3000/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const wishlistMovies = data.wishlist;
        if (wishlistMovies.includes(parseInt(id))) {
          setIsInWishlist(true);
        }
      } catch (err) {
        console.error("Error checking wishlist:", err);
      }
    };
    checkWishlist();
  }, [id]);

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/wishlist/add",
        { movieId: parseInt(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsInWishlist(true);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/wishlist/remove",
        { movieId: parseInt(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsInWishlist(false);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const watchTrailer = () => {
    if (movie && movie.trailer_url) {
      window.open(movie.trailer_url, "_blank");
    } else {
      console.error("Trailer URL not available.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
          <p className="text-center text-white">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return <p className="text-center text-white">Movie not found.</p>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-16">
      <motion.div 
        className="container mx-auto flex flex-col md:flex-row items-center bg-zinc-900 rounded-lg shadow-lg p-10 gap-12 w-4/5 max-w-6xl"
        initial={{ opacity: 0, y: -50 }} // Initial state for animation
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        transition={{ duration: 0.5 }} // Duration of the animation
      >
        
        {/* Movie Poster */}
        <div className="w-full md:w-1/3 flex justify-center">
          <motion.img
            className="rounded-lg shadow-lg object-cover h-[25rem] w-[18rem] border-2 border-gray-800"
            src={movie.cover_url}
            alt={movie.title}
            whileHover={{ scale: 1.05 }} // Scale effect on hover
            transition={{ duration: 0.3 }} // Duration of the hover effect
          />
        </div>

        {/* Movie Details */}
        <div className="w-full md:w-2/3 text-white">
          <h1 className="text-5xl font-bold mb-4 text-white">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-6">Release Date: {movie.release_date}</p>
          <hr className="border-gray-700 mb-6" />
          <h3 className="text-2xl text-gray-300 mb-4">{movie.saga}</h3>
          <p className="text-lg text-gray-400 mb-8">{movie.overview}</p>

          {/* Extra Info Section */}
          <div className="flex flex-col gap-4 text-lg">
            <p><span className="font-bold text-gray-200">Phase:</span> {movie.phase}</p>
            <p><span className="font-bold text-gray-200">Box Office:</span> ${movie.box_office}</p>
            <p><span className="font-bold text-gray-200">Duration:</span> {movie.duration} minutes</p>
          </div>

          {/* Watch Trailer Button */}
          <motion.button
            className="mt-4 mr-4 px-4 py-2 bg-red-700 rounded-md text-zinc-50"
            onClick={watchTrailer}
            whileHover={{ scale: 1.1 }} // Scale effect on hover
            transition={{ duration: 0.3 }} // Duration of the hover effect
          >
            Watch Trailer
          </motion.button>

        </div>
      </motion.div>   
    </div>
  );
};

export default MovieDetails;
