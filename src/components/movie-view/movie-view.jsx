import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies}) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie.id === movieId);
  
  
   
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
     
      <Link to={`/`}>
        <Button style={{cursor: "pointer"}} className="m-3" variant="outline-warning">Back</Button>
      </Link>
      <Link as={Link} to="/users" style={{ }} >al perfil</Link>
      
    </div>
    
  );
};
            
 
