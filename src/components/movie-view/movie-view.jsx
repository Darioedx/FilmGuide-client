import PropTypes from "prop-types";
import { arrayOf } from "prop-types";
import { Button, Card } from "react-bootstrap";
let genreToFilter;
let similarMovies;
export const MovieView = ({similar, movie, onBackClick,onDirector, bio}) => {
   
            
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
        <span onClick={onDirector}>{movie.director}</span>
      </div>
      <div>
        <span>{bio}</span>     
      </div>
     
      <div>
        <span>Actors: </span>
        <span >{movie.actors}</span>
      </div>
      <Button variant="outline-warning" className="m-3" onClick={onBackClick}>Back</Button>
     
    </div>
    
  );
};


MovieView.propTypes = {
  movie: PropTypes.shape({
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  genre:PropTypes.array,
  bio: PropTypes.string,
  actors:PropTypes.array
  

}).isRequired,
onBackClick: PropTypes.func.isRequired,
onDirector:  PropTypes.func.isRequired,
};