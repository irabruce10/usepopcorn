import { useEffect, useState } from "react";
import "./index.css";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY = "6b56d598";

export default function App() {
  const [query, setQuery] = useState("fast");
  const [movies, setMovies] = useState([]);
  const [moviesWatched, setMoviesWatched] = useState([]);
  const [selectId, setSelectId] = useState([]);

  useEffect(
    function () {
      async function m() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        const data = await res.json();
        setMovies(data.Search);

        console.log(data);
      }

      if (!query.length) {
        setMovies([]);
        return;
      }

      m();
    },
    [query]
  );

  function handleSelectId(id) {
    setSelectId((selectId) => (id === selectId.imdbID ? null : id));
    
  }

  return (
    <div>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SummaryResult movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <FilmList movies={movies} onSelectId={handleSelectId} />
        </Box>

        <Box>
          <Details />
          <FilmWatchedList moviesWatched={moviesWatched} />
        </Box>
      </Main>
    </div>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ setQuery, query }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="movies"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function SummaryResult({ movies }) {
  return <p className="num-results">Found {movies.length} result</p>;
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function FilmList({ movies, onSelectId }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Film key={movie.imdbID} movie={movie} onSelectId={onSelectId} />
      ))}
    </ul>
  );
}
function Film({ movie, onSelectId }) {
  return (
    <li onClick={() => onSelectId(movie)}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Details() {
  return <div className="detail">details</div>;
}

function FilmWatchedList({ moviesWatched, onSelect, onDelete }) {
  return (
    <ul className="list">
      {moviesWatched.map((movie) => (
        <FilmWatched key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function FilmWatched({ movie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime}</span>
        </p>
      </div>
    </li>
  );
}
