import React from "react";
import { useState, useEffect} from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const[selectedDirector, setSelectedDirector] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movies-guide.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
            actors:data.Actors.map((actor, index) =>  <li key={index}>{actor}</li>),
            bio: data.Director.Bio,
            description: data.Genre.Description
            
          };
          
        });

        setMovies(moviesFromApi);
      });
     }, [token]);

  if (!user) {
    return (<LoginView onLoggedIn={(user, token) => {setUser(user);setToken(token);}}/>);}

  if (selectedMovie) {
    const genreToFilter = selectedMovie.genre[0];
    let similarMovies = movies.filter(movie => movie.genre.includes(genreToFilter));   
    similarMovies = similarMovies.filter(function (movie) {
      return movie.title !== selectedMovie.title;
  });
    return (<>
      <button onClick={() => { setUser(null); setToken(null);  localStorage.clear();}}>Logout </button>
      
      <MovieView  movie={selectedMovie}  bio={selectedDirector} onBackClick={() =>{ setSelectedMovie(null);setSelectedDirector(null)}}  
      onDirector={()=>setSelectedDirector(selectedMovie.bio)}/>
      
      <hr/>
     
      <h2>Similar movies</h2>
      {similarMovies.map((movie) => (<MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => 
        {setSelectedMovie(newSelectedMovie);setSelectedDirector(null)}}/>))}
    </>);
  }

  if (movies.length === 0) {
    <>  
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    return <div>The list is empty!</div>;
    </>
  }

  return (
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>LogoutHOLAAA</button>
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
