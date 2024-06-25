import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieCredits } from "../redux/action";
import "../Styles/MovieDetails.css";
import Loading from "./Loading";
import CastDetails from "./CastDetails";

const MovieDetails = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const movieCredits = useSelector((state) => state.movies.movieCredits);
  const error = useSelector((state) => state.movies.error);
  const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieCredits(movieId));
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    console.log("Movie ID:", movieId);
    console.log("Movies:", movies);
    console.log("Selected Movie:", selectedMovie);
  }, [movies, selectedMovie, movieId]);

  const handleBackClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="movie-details">
      {status === "loading" && <Loading />}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && selectedMovie ? (
        <div className="details-container">
          <img
            src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="details-poster"
          />
          <div className="details-info">
            <h2>{selectedMovie.original_title}</h2>
            <p>
              <strong>Overview:</strong> {selectedMovie.overview}
            </p>
            <p>
              <strong>Released:</strong> {selectedMovie.release_date}
            </p>
            <p>
              <strong>IMDB Rating:</strong> {selectedMovie.vote_average}
            </p>
            <div className="cast-info">
              <strong>Cast:</strong>{" "}
              {movieCredits.length > 0 ? (
                <CastDetails cast={movieCredits} />
              ) : (
                <p>No cast details available</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        status === "succeeded" && <p>Movie not found</p>
      )}
      <button onClick={handleBackClick} className="back-button">
        Back
      </button>
    </div>
  );
};

export default MovieDetails;
