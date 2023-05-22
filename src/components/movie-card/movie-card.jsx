import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card style={{ width: '10rem' }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() =>  onMovieClick(movie)} variant="link">Open</Button>
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


