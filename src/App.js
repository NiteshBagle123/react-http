import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [ isLoading, setIsLoading] = useState(false);
  const [ error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(currState => !currState);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();

      if(response.status >= 400) {
        throw new Error('Something went wrong!')
      }

      setMovies(data.results);
      setIsLoading(currState => !currState);
    } catch (error) {
      setError(error && error.message);
      setIsLoading(currState => !currState);
    }
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);
  
  let content = <p>Movies not found</p>;

  if(movies && !isLoading) {
    content = <MoviesList movies={movies} />;
  };

  if(isLoading) {
    content = <p>Loading...</p>
  };

  if(!isLoading && error) {
    content = <p>{error}</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
