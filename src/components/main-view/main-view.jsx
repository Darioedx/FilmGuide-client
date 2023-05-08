import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Good Fellas",
      image:"https://pics.filmaffinity.com/goodfellas-343032101-mmed.jpg",   
      director: "Martin Scorsese",
      plot:"A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive compete against each other over a gambling empire, and over a fast-living and fast-loving socialite.",
      genre:"Crime/Gangster"
    },
    {
      id: 2,
      title: "The Big Lebowski",
      image:"https://pics.filmaffinity.com/the_big_lebowski-877217211-mmed.jpg",
      director: "Joel Coen",
      plot:"Ultimate L.A. slacker Jeff \"The Dude\" Lebowski, mistaken for a millionaire of the same name, seeks restitution for a rug ruined by debt collectors, enlisting his bowling buddies for help while trying to find the millionaire\'s missing wife.",
      genre:"Black Comedy"
    },
    {
      id: 3,
      title: "Rosemary's Baby",
      image:"https://pics.filmaffinity.com/rosemary_s_baby-673657233-large.jpg",
      director: "Roman Polanski",
      plot:"A couple settles in a New York apartment without suspecting that their elderly neighbors belong to a satanic sect.",
      genre:"Horror/Occult"
    },
   
    
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
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
