import { useState } from "react";
import "./index.css";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  return (
    <div>
      <NavBar />
      <Main />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <SummaryResult />
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

function Search() {
  return (
    <>
      <input className="search" type="search" placeholder="Search movies..." />
    </>
  );
}

function SummaryResult() {
  return <p className="num-results">Found X result</p>;
}

function Main() {
  return (
    <div className="main">
      <FilmList />
      <FilmWatchedList />
    </div>
  );
}

function FilmList() {
  const [movies, setMovies] = useState(tempMovieData);
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="box">
      <button className="btn-toggle" onClick={handleOpen}>
        {isOpen ? "-" : "+"}
      </button>
      <ul className="list">
        {isOpen &&
          movies.map((movie) => <Film key={movie.imdbID} movie={movie} />)}
      </ul>
    </div>
  );
}
function Film({ movie }) {
  return (
    <li className="">
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

function FilmWatchedList() {
  const [moviesWatched, setMoviesWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(false);

  function handleOpen2() {
    setIsOpen2(!isOpen2);
  }
  return (
    <div className="box">
      <button className="btn-toggle" onClick={handleOpen2}>
        {isOpen2 ? "-" : "+"}
      </button>
      <ul className="list">
        {isOpen2 &&
          moviesWatched.map((movie) => (
            <FilmWatched key={movie.imdbID} movie={movie} />
          ))}
      </ul>
    </div>
  );
}

function FilmWatched({ movie }) {
  return (
    <li className="">
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
