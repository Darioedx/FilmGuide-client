import React from "react";
import { useState, useEffect} from "react";
import { MovieCard } from "../movie-card/movie-card";
import{FavmovCard}from "../movie-card/favmov-card";
import { MovieView } from "../movie-view/movie-view";
import {SimilarMov } from "../movie-view/similar-view.jsx";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import{ProfileView} from "../user-profile/user-profile";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import { nanoid } from "nanoid";

  

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
            actors:data.Actors,
            bio: data.Director.Bio,
            description: data.Genre.Description
            
          };
          
        });

        setMovies(moviesFromApi);
     
        
      });
     }, [token]);
     
     const [genero, setGenero]= useState("")
     let isChecked;
     const[byGenres,setByGenres]=useState([])
  const handleOnChange = (genre) => {
   
    //isChecked = !isChecked;
    setGenero(genre)
    console.log(isChecked)
     console.log(genre)
     console.log(genero)//este me muestra el valor genero anterior al clickiado
    
    let movGenre= movies.filter(movie => movie.genre.includes(genre))
    setByGenres(movGenre)
   
    if( genre == genero){setByGenres([]), setGenero("")}////ajustar logica utilizando los valores de "genre" "genero" "true/false"
   
    // window.location.replace(`/movies/genres/${genre}`)
   
  };

  const unchecked =(id) => {document.getElementById(id).checked = false;}
//const secondUncheck = (classNamw)=> document.getElementsByClassName('pepe')
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
        backHome = {(()=>{setFavorites(""); setByGenres([]); window.location.replace("/")})} 
        user={user}
        onLoggedOut={onLoggedOut}
        movies = {movies}
        handleOnChange= {handleOnChange}
        unchecked = {unchecked }
        favorites={favorites}
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
                    <Col key={nanoid()} md={8} >
                      <MovieView  key={nanoid()} movies={movies} user={user} onFavorites={onFavorites} updateUser={updateUser}/>
                      <SimilarMov movies={movies}/>
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
                          <FavmovCard movie={movies} user={user} favorites={favorites} updateUser={updateUser} onFavorites={onFavorites}/>
                      </>
                    )
                    : byGenres.length > 0 ?(
                      <>
                      <span>{genero} Films</span>
                     {byGenres.map((movie) => (
                        <Col className="mb-4" key={movie.id} xs={6} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                      </>
                    ) 
                   
                      : (
                    <>
                     
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} xs={6} md={3}>
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
               <Route
                  path="/movies/genres/:genreName"
                  element={
                     !user ? (
                         <Navigate to="/singup" replace />
                     ) 
                     
                    
                    : (<>
                      
                        Holaaaa
                        </>)
                           }
                       />             
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };
  
     
   
 


