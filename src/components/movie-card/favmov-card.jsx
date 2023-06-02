import PropTypes from "prop-types";
import { Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const FavmovCard = ({ user ,movie}) => {
  
  
  const delFavorite = () => {
     
 
    let token = localStorage.getItem("token")
     
    fetch(`https://movies-guide.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
        }) .then(response => {
          if (response.ok) {
            console.log("Login response: ", response);
              return response.json();
          } else {
              alert("Failed to delete");
              return false;
          }
      })
      .then(user => {
          if (user) {
              alert("Successfully added movie");
              window.location.reload();
          }
      })
      .catch(e => {
          alert(e);
      })}
  return (
    <Card className="h-100 mt-5 "  style={{ border: "5px solid #8b7e07",  }}>
      <Card.Img   variant="top" src={movie.image} />
      <Card.Body style={{backgroundColor: 'rgb(38, 0, 54)'}}>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Link to={`/`}>
          <Button onClick={delFavorite} variant="link">del</Button>
        </Link>
      </Card.Body>
    </Card>
  );
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