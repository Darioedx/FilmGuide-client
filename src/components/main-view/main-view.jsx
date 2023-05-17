import React from "react";
import { useState, useEffect} from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const[selectedDirector, setSelectedDirector] = useState(null);

  useEffect(() => {
    fetch("https://movies-guide.herokuapp.com/movies")
    .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((data) => {
          
          return {
            id: data._id,
            title: data.Title,
            image:data.Imgpath,
            genre:data.Genre.Name,
            director: data.Director.Name,
            plot: data.Plot,
            actors:data.Actors.map((number, index) =>  <li key={index}>{number}</li>),
            bio: data.Director.Bio,
            description: data.Genre.Description
            
          };
          
        });

        setMovies(moviesFromApi);
      });
     }, []);

  if (selectedMovie) {
    const genreToFilter = selectedMovie.genre[0];
    const similarMovies = movies.filter(movie => movie.genre.includes(genreToFilter));
    console.log(selectedMovie.genre[0])
    return (<>
      <MovieView  movie={selectedMovie}  bio={selectedDirector} onBackClick={() => setSelectedMovie(null)}  
      onDirector={()=>setSelectedDirector(selectedMovie.bio)}/>
      
      <hr/>
      <h2>Similar movies</h2>
      {similarMovies.map((movie) => (<MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie);}}/>))}
    </>);
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
