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
  "Welcome to the World of Beautiful Scenery!",
  "Discover Amazing Places Around the Globe.",
  "Experience Nature Like Never Before.",
  "Unforgettable Moments Await You.",
  "Explore New Horizons with Every Step.",
  "Join the Journey of a Lifetime!",
];

const AutoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate text using GSAP
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1 }
    );
  }, [currentIndex]);

  return (
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
      {/* Text Overlay */}
      <div className="absolute inset-0 pt-64 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <h1 
          ref={textRef}
          className="text-5xl mb-8 transition-opacity duration-1000 ease-linear font-bold text-white"
        >
          {texts[currentIndex]}
        </h1>
        <button className="px-3 py-1 bg-red-600">
          <Link to="/mcu-movies">Watch Now</Link>
        </button>
      </div>
      
      <MarvelHistory/>
    </div>

  );
};

export default AutoSlider;
