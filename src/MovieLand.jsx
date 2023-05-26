import { MovieCard } from "./MovieCard";
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";

const api_key = "http://www.omdbapi.com?apikey=ac1cc004";

const movie1 = {
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMjk3ODhmNjgtZjllOC00ZWZjLTkwYzQtNzc1Y2ZhMjY2ODE0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
  Title: "Superman/Batman: Apocalypse",
  Type: "movie",
  Year: "2010",
  imdbID: "tt1673430",
};

const MovieLand = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovie = async (title) => {
    const resp = await fetch(`${api_key}&s=${title}`);
    const data = await resp.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("Superman");
  }, []);

  return (
    <div className="app">
      <h1>Metflix</h1>
      <div className="search">
        <input
          type="text"
          placeholder="search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(search)}
        />
      </div>
      <div className="container">
        {movies?.length > 0 ? (
          movies.map((movie) => <MovieCard {...movie} key={movie.imdbID} />)
        ) : (
          <div className="empty">
            <h2>No Movie found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieLand;
