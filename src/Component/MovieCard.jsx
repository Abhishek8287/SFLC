import React from "react";
import { Link } from "react-router-dom";
import "../Styles/MovieCards.css";

const truncateOverview = (overview) => {
  return overview.length > 100 ? overview.substring(0, 100) + "..." : overview;
};

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.original_title}</h3>
      <p>{truncateOverview(movie.overview)}</p>
      <Link to={`/movie/${movie.id}`} className="link-button">
        <button>Read More</button>
      </Link>
    </div>
  );
};

export default MovieCard;
