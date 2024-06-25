import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./Component/MovieList";
import MovieDetails from "./Component/MovieDetails";
import "./App.css"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
