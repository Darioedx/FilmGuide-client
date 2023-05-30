import PropTypes from "prop-types";
import { Button, Card} from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 mt-5 " style={{ border: "5px solid #8b7e07"}}>
      <Card.Img   variant="top" src={movie.image} />
      <Card.Body style={{backgroundColor: 'rgb(37, 1, 54)'}}>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button   onClick={() =>  onMovieClick(movie)} variant="link">Open</Button>
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
  onMovieClick: PropTypes.func.isRequired,
  
};


