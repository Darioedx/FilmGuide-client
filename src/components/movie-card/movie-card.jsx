import PropTypes from "prop-types";
import { Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";





export const MovieCard = ({ movie}) => {
  return (
    <Card className="h-100 mt-5"  style={{ border: "5px solid #8b7e07",  }}>
      <Card.Img   variant="top" src={movie.image} alt="movie image"/>
      <Card.Body style={{backgroundColor: 'rgb(38, 0, 54)'}}>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button  variant="link ">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};


MovieCard.propTypes = {
  movie: PropTypes.shape({
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  genre:PropTypes.array,
  bio: PropTypes.string,
  actors:PropTypes.array
  

}).isRequired,


};