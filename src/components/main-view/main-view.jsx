import React from "react";
import { useState, useEffect} from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const[selectedDirector, setSelectedDirector] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  let genreToFilter 
  let similarMovies 
  let ver
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
     if (selectedMovie) {
     genreToFilter = selectedMovie.genre[0];
     similarMovies = movies.filter(movie => movie.genre.includes(genreToFilter));   
     similarMovies = similarMovies.filter(function (movie) {
       return movie.title !== selectedMovie.title;})
    console.log(similarMovies)
    console.log(genreToFilter)
    }
      
     return (
     
      <Row  className="justify-content-center h-100" style={{ margin: "0 auto"}}> 
        
        {
         !user? (<Col md={5}> <LoginView onLoggedIn={(user) => setUser(user)} />
          <h2 style={{textAlign:"center" }}>or</h2>
          <SignupView />
        </Col>)
        
         : selectedMovie ? (<>  
            
          
           <Container style={{marginLeft: "100%", }} className="w-25"> <Button  style={{cursor: "pointer"}}variant="outline-warning" onClick={() => { setUser(null); setToken(null);  localStorage.clear();}}>Logout </Button></Container>
             <Col md={8} ><MovieView movie={selectedMovie}  bio={selectedDirector} onBackClick={() =>
              { setSelectedMovie(null);setSelectedDirector(null)}}  
             onDirector={()=>setSelectedDirector(selectedMovie.bio)}/></Col><hr></hr>
           
            <h2>Similar Movies</h2>
           
            {similarMovies.map((movie) => (<Col  className="mb-5" xs={12} md={3}  key={movie.id} ><MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie);
           setSelectedDirector(null);}}/></Col>))} 
           
            
             
          </>) 
      
     
         : movies.length === 0 ? (<>
              <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
              <div>The list is empty!</div>
             
          </>) 
         
         : ( <> 
              <Col  style={{ position:"absolute",marginLeft: "100%"}} className="w-25" ><Button  style={{ cursor: "pointer"}}variant="outline-warning" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button></Col>
              {movies.map((movie) => (<Col className="mb-5" sm={12} md={6}lg={4} xl= {4} key={movie.id} ><MovieCard  movie={movie} 
              onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie)}} /></Col>))}
         </>)
        }
      </Row>
      
  );  
 

  
};
