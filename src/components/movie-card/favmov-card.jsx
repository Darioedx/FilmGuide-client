import PropTypes from "prop-types";
import { Button, Card, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";


export const FavmovCard = ({  movie, favorites, onFavorites, updateUser}) => {
 
  const filteredMovies = movie.filter(movie => favorites.includes(movie.id));


let token = localStorage.getItem("token")
let user =localStorage.getItem("user") 
console.log(user)

  



  return (<div>
   
   {filteredMovies.map(movie => (<Col>
    <Card className="h-100 mt-5 "  style={{ border: "5px solid #8b7e07",  }}>
      <Card.Img   variant="top" src={movie.image} />
      <Card.Body style={{backgroundColor: 'rgb(38, 0, 54)'}}>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Link to={`/`}>
          <Button variant="link">del</Button>
        </Link>
      </Card.Body>
    </Card>
   
   
   </Col>))}</div>);
};


FavmovCard.propTypes = {
  movie: PropTypes.shape({
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  genre:PropTypes.array,
  bio: PropTypes.string,
  actors:PropTypes.array
  

}).isRequired,


};