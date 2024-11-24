import React, { useEffect, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { gsap } from "gsap";
import MarvelHistory from "./MarvelHistory";

const images = [
  "https://th.bing.com/th/id/OIP.qj0t6VEISzc6cqVEQhkrfQHaEK?w=1920&h=1080&rs=1&pid=ImgDetMain",
  "https://4kwallpapers.com/images/walls/thumbs_3t/942.jpg", 
  "https://wallpapercave.com/wp/wp3830173.jpg",
  "https://wallpapercave.com/wp/wp3898571.jpg",
  "https://4kwallpapers.com/images/wallpapers/marvels-spider-man--13286.jpeg",
  "https://wallpapercave.com/wp/wp6303838.jpg",
];

const texts = [
  "Welcome to the Ultimate Marvel Universe Experience",
  "Discover the Epic Stories of Marvel Heroes",
  "Immerse Yourself in Cinematic Excellence",
  "Join the Legacy of Marvel Entertainment",
  "Experience Marvel's Greatest Adventures",
  "Your Gateway to Marvel's Infinite Universe",
];

const AutoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Changed to 5 seconds for better viewing experience

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1 }
    );
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Slider */}
      <div className="relative w-full h-screen overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-linear ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60">
          <h1 
            ref={textRef}
            className="text-6xl mb-8 text-center px-4 font-bold text-white tracking-wider"
          >
            {texts[currentIndex]}
          </h1>
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors rounded-lg text-white text-lg font-semibold">
            <Link to="/mcu-movies">Explore Movies</Link>
          </button>
        </div>
      </div>

      <MarvelHistory/>

     
    </div>
  );
};

export default AutoSlider;
