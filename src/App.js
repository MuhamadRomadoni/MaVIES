import './App.css';
import { getMovieList, searchMovie } from './Api.js'
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = (() => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-tittle">{movie.title}</div>
          <img className="movie-img"
            src={`${process.env.REACT_APP_BASEIMG}/${movie.poster_path}`} />
          <div className="movie-date">{movie.release_date}</div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>)
    })
  });

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>FREE MOVIES</h1>
        <input
          placeholder="search movie..."
          className="movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;