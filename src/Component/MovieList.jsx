import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, searchMovies } from "../redux/action";
import "../Styles/MovieList.css";
import MovieCard from "./MovieCard";
import { clearMovies, setQuery } from "../redux/movieSlice";
import Loading from "./Loading";

const MovieList = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.movies.query);
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    if (!query) {
      dispatch(fetchMovies());
    } else {
      dispatch(searchMovies(query));
    }
  }, [dispatch, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      dispatch(searchMovies(query));
    } else {
      dispatch(fetchMovies());
    }
  };

  const handleClear = () => {
    dispatch(clearMovies());
  };

  const handleQueryChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);

    toggleButtonRef.current.focus();

    toggleButtonRef.current.classList.add("animate-toggle");
    setTimeout(() => {
      toggleButtonRef.current.classList.remove("animate-toggle");
    }, 5000);
  };

  return (
    <div className={`container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {status === "loading" && <Loading />}
      {status === "failed" && <p>{error}</p>}

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Movie name"
          value={query}
          onChange={handleQueryChange}
          className="search-input"
        />
        <div className="buttongroup">
          <button type="button" onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      </form>
      <div className="theme-toggle-container">
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
          ref={toggleButtonRef} // Attach ref to the toggle button
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </div>
      <div className="movie-list">
        {status === "succeeded" &&
          movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default MovieList;
