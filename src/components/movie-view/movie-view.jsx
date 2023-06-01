import PropTypes from "prop-types";

import { Button, Form , Col, Card} from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
export const MovieView = ({user ,token ,movies}) => {
  const { movieId } = useParams();
 
  token = localStorage.getItem("token")
 

  console.log(user.FavoritesMovies)
  
  const movie = movies.find((movie) => movie.id === movieId);

    const addFavorite = () => {
        fetch(`https://movies-guide.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
        }) .then(response => {
          if (response.ok) {
            console.log("Login response: ", response);
              return response.json();
          } else {
              alert("Failed to add");
              return false;
          }
      })
      .then(user => {
          if (user) {
              alert("Successfully added movie");
              
          }
      })
      .catch(e => {
          alert(e);
      })}
  
  
   
  return (
   <div>
    <div>
      <img src={movie.image} />
    </div>
    <div>
      <span >Title: </span>
      <span>{movie.title}</span>
    </div>
    <div>
      <span>Plot: </span>
      <span>{movie.plot}</span>
    </div>
    <div>
      <span>Genre: </span>
      <span>{movie.genre}</span>
      
    </div>
    <div>
      <span>Director: </span>
      <span >{movie.director}</span>
    </div>
    <div>
      <span>Actors: </span>
      <span >{movie.actors}</span>
    </div>
    
    <>
     
      <Link to={`/`}>
        <Button style={{cursor: "pointer"}} className="m-3" variant="outline-warning">Back</Button>
      </Link>

    
      
      
      <Button onClick={addFavorite} style={{cursor: "pointer"}} className="m-3" variant="outline-warning">Add to favorites</Button>
  
      <Button style={{cursor: "pointer"}} className="m-3" variant="outline-warning">show favorites</Button>
     
      </>
    </div>
    
  );
};
            
 
