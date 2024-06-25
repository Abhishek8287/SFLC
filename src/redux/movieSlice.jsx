import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, fetchMovieCredits, searchMovies } from "./action";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
    selectedMovie: null,
    movieCredits: [],
    query: "", 
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearMovies: (state) => {
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovieCredits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieCredits = action.payload;
      })
      .addCase(fetchMovieCredits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setQuery, clearMovies } = movieSlice.actions;

export default movieSlice.reducer;
