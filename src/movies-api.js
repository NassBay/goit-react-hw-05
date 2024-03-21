import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmRkYmQ3NGQyNDU5M2U0MzNhODMwYTIwMTA5ZTE5ZCIsInN1YiI6IjY1ZWVlYzI2ZjVjYjIxMDE2MjQ1NDIyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k9nlvDPgDgscgL8aLJ_60PeLc9fLBlnGRB3Y6o4RWw8",
    Accept: "application/json",
  },
};

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

export const fetchMovie = async () => {
  const response = await axios
    .get(url, options)
    .catch((err) => console.log(err));

  return response.data.results;
};

export const searchMovie = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const movieDetails = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const movieCredits = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const movieReview = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data.results;
};
