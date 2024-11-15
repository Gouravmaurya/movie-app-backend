import {Routes, Route} from 'react-router-dom';
import McuMovies from "./Components/McuMovies";
import Login from './components/Login';
import Signup from './Components/Signup';
import MovieDetails from './Components/MovieList';
import Home from './Components/Home';
import Wishlist from './components/Wishlist';  // Import Wishlist component
import Navbar from './Components/Navbar';
import "./index.css";

function App() {
  return (
    <div className='bg-black h-screen w-screen'>
        <Navbar />
      <Routes>
      <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           {/* <Route path="/movies/:id" element={<MovieList />} /> */}
           <Route path="/movie/:id" element={<MovieDetails />} />
           <Route path="/" element={<Home/>} />
           <Route path="/wishlist" element={<Wishlist/>} />
       <Route path="/mcu-movies" element={<McuMovies />} />
    </Routes>
    </div>
  )
}
export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import MovieList from './components/MovieList';
// import Wishlist from './components/Wishlist';
// import McuMovies from './components/McuMovies';  // Import MCU Movies component

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/movies" element={<MovieList />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/mcu-movies" element={<McuMovies />} />  {/* MCU Movies route */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
