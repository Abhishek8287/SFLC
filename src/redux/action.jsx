import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TMDB_API_KEY = "352aa8778988c2a2e5d44f0dd6add6cd";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US`
      );

      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMovieCredits = createAsyncThunk(
  "movies/fetchMovieCredits",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
      );

      return response.data.cast.slice(0, 10);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${TMDB_API_KEY}&language=en-US`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
