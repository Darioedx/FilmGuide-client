import React from "react";
import { useState, useEffect} from "react";
import { MovieCard } from "../movie-card/movie-card";
import{FavmovCard}from "../movie-card/favmov-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import{ProfileView} from "../user-profile/user-profile";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";


  
  

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(null);
 

  const updateUser = user => {setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  } 
 
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
            actors:data.Actors.map((actor, index) => <Container><li key={index}>{actor}</li></Container>),
            bio: data.Director.Bio,
            description: data.Genre.Description
            
          };
          
        });

        setMovies(moviesFromApi);
      });
     }, [token]);
   //add movies to favorites  
     let favMov=[]
     if (user)(
        user.FavoritesMovies.map((m_id, index) => {
         favMov.push(movies.find((movie)=> movie.id == m_id))
         console.log(favMov)         
     })
     )
    
    
     return (
      <BrowserRouter>
        <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        movies = {movies} emptyFav={() => { setFavorites(null)}}  onFavorite={() => { setFavorites(favMov )}}
      />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
  
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) 
                  : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                    
                  )}
                </>
  
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) 
                  : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) 
                  : (
                    <Col md={8}>
                      <MovieView movies={movies} user={user} token={token} onFavorite={() => { setFavorites(favMov )}} newFav={()=> setFavorites(null)}/>
                      
           
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (<> <Navigate to="/" replace /> <Col md={5}> <SignupView /></Col> </>)
                   
                   : movies.length === 0 ? (
                    <Col>The list is empty!</Col> )
                    
                    : favorites ? (<>
                      {favMov.map((movie)=>(<Col className="mb-4" key={movie.id}xs={6} md={3}>
                      < FavmovCard  movie={movie} user={user}/>
                     </Col>))}

                      </>)
                   
                      : (
                    <>
                     
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id}xs={6} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
             <Route
                 path="/users"
                   element={
                      !user ? (
                          <Navigate to="/singup" replace />
                      ) 
                      
                     
                     : (<>
                          <ProfileView user={user} token={token} movies={movies}  updateUser={updateUser}/>
                         
                         </>)
                            }
                        />   
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };
  
     
   
 


