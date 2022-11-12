import { useState, useEffect } from "react";
import facade from "../facades/apiFacade";
import AllMoviesAndReviews from "./AllMoviesAndReviews";
import "../styles/tables.css";

function Movies(props) {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieAndReview, setMovieAndReview] = useState({});
  const [moviesAndReviews, setMoviesAndReviews] = useState([]);

  useEffect(() => {
    facade.getMovies((movies) => {
      setMoviesAndReviews(movies);
    });
  }, [facade]);

  const onInputChange = (event) => {
    const movieTitle = event.target.value;
    setMovieTitle(movieTitle);
  };

  const removeMovie = (movieId, e) => {
    facade.removeMovieFromWatchlist(movieId, (person) => {
      setMoviesAndReviews(
        moviesAndReviews.filter(
          (movieAndReview) => movieAndReview.movie.id !== movieId
        )
      );
    });
    e.preventDefault();
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Search Movie</h3>
      <form style={{ textAlign: "center" }}>
        <input
          id="search"
          type="text"
          placeholder="Search Movie"
          onChange={onInputChange}
          value={movieTitle}
          required
        />
        <button
          type="submit"
          onClick={(e) => {
            facade.searchMovie(movieTitle, (movie) => {
              setMovieAndReview(movie);
            });

            e.preventDefault();
          }}
        >
          Search Movie
        </button>
        <h3>{movieAndReview?.movie?.title}</h3>
        {movieAndReview?.movie && (
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const movieDTO = {
                title: movieAndReview.movie.title,
                year: movieAndReview.movie.year,
              };
              facade.addMovieToWatchlist(movieDTO, (person) => {
                const addedMovie = person.movies.filter(
                  (movie) =>
                    movie.title === movieDTO.title &&
                    movie.year === movieDTO.year
                )[0];
                movieAndReview.movie.id = addedMovie.id;
                setMoviesAndReviews([...moviesAndReviews, movieAndReview]);
                setMovieTitle("");
                setMovieAndReview({});
              });
            }}
          >
            Add movie to watchlist
          </button>
        )}
      </form>
      <AllMoviesAndReviews
        allMoviesAndReviews={moviesAndReviews}
        removeMovie={removeMovie}
      />
    </div>
  );
}

export default Movies;
