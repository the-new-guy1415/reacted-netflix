import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const fetchTrailerUrl = async (movie) => {
    try {
      // Use the TMDB API to fetch video data for the movie
      const response = await axios.get(
        `/movie/${movie.id}/videos?api_key=YOUR_TMDB_API_KEY_HERE`
      );

      // Check if there's a trailer available for this movie
      const trailer = response.data.results.find(
        (result) => result.type === "Trailer"
      );

      if (trailer) {
        setTrailerUrl(trailer.key);
      } else {
        console.log("No trailer found for this movie.");
        // Handle this case, e.g., by displaying a message to the user.
      }
    } catch (error) {
      console.error("Error fetching trailer URL:", error);
      // Handle the error gracefully, e.g., by displaying an error message.
    }
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // Clear the trailer URL to close the player
    } else {
      fetchTrailerUrl(movie);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
