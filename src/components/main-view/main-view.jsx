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

import { Container } from "react-bootstrap";


 
  

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
 
 //primero muestro los favoritos que tengo 
  const [favorites, setFavorites] = useState("");
  const onFavorites=(()=>{setFavorites(user.FavoritesMovies);
    
  
  }) 
  
 /// 
 

  const updateUser = user => {setUser(user);
  localStorage.setItem("user", JSON.stringify(user));///poque uso stryngfy???? asi se pasa los valores en local storage
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
            actors:data.Actors.map((actor, index) => <Container ><li>{actor}</li></Container>),
            bio: data.Director.Bio,
            description: data.Genre.Description
            
          };
          
        });

        setMovies(moviesFromApi);
        
      });
     }, [token]);
   
     onLoggedOut=() => {
      setUser(null);
      setToken(null);
      localStorage.clear();
      window.location.replace("/")
    }
    
     return (
      <BrowserRouter>
        <NavigationBar
        onFavorite={onFavorites}
        backHome = {(()=>{setFavorites("")})} 
        user={user}
        onLoggedOut={onLoggedOut}
        movies = {movies}/>
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
                      <SignupView onLoggedIn={(user) => setUser(user)} />
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
                      <MovieView movies={movies} user={user} onFavorites={onFavorites} updateUser={updateUser}/>
                      
           
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
                    
                    : favorites?(
                      <>
                     
                      
                        <Col className="mb-4"  xs={6} md={3}>
                          <FavmovCard movie={movies} user={user} favorites={favorites} updateUser={updateUser} onFavorites={onFavorites}/>
                        </Col>
                     
                    </>
                    )
                   
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
                          <ProfileView user={user} token={token} movies={movies} onLoggedOut={onLoggedOut} updateUser={updateUser}/>
                         
                         </>)
                            }
                        />   
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };
  
     
   
 


