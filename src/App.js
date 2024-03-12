import { useEffect, useState } from "react";
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

const KEY = "6b56d598";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [moviesWatched, setMoviesWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const squery = "fast";
  // function handleDetails(movie) {
  //   const currentEl = selectMovie.find((el) => el.id === movie.id);

  //   if (currentEl) {
  //     setSelectMovie(
  //       selectMovie.map((el) =>
  //         el.id === movie.id ? { ...currentEl, qty: currentEl.qty + 1 } : el
  //       )
  //     );
  //   } else {
  //     setSelectMovie([...selectMovie, { ...movie, qty: 1 }]);
  //   }
  // }

  // console.log(setMovies, setMoviesWatched);

  useEffect(function () {
    console.log("a");
  }, []);

  console.log("c");

  useEffect(function () {
    async function rend() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${squery}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies ");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie Not Found...");

        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    rend();
  }, []);

  return (
    <div>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SummaryResult movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}

          {!isLoading && !error && <FilmList movies={movies} />}

          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <FilmWatchedList moviesWatched={moviesWatched} />
        </Box>
      </Main>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading.....</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>-</span>
      {message}
    </p>
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

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Search movies..."
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
// function WatchedBox() {
//   const [isOpen2, setIsOpen2] = useState(true);
//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((isOpen2) => !isOpen2)}
//       ></button>
//       {isOpen2 && <FilmWatchedList />}
//     </div>
//   );
// }

function FilmList({ movies, onDetails }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <Film key={movie.imdbID} movie={movie} onDetails={onDetails} />
      ))}
    </ul>
  );
}
function Film({ movie, onDetails }) {
  return (
    <li className="">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
          {/* <button onClick={() => onDetails(movie)}>add to cart</button> */}
        </p>
      </div>
    </li>
  );
}

function FilmWatchedList({ moviesWatched, onSelect }) {
  return (
    <ul className="list">
      {moviesWatched.map((movie) => (
        <FilmWatched key={movie.imdbID} movie={movie} onSelect={onSelect} />
      ))}

      {/* {onSelect.map((movie) => (
        <FilmWatched key={movie.imdbID} movie={movie} />
      ))} */}
    </ul>
  );
}

function FilmWatched({ movie }) {
  return (
    <li>
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
