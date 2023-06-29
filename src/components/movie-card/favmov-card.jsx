import PropTypes from "prop-types";
import { Button, Card, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";


export const FavmovCard = ({ movie, favorites, user, updateUser, onFavorites }) => {
  const filteredMovies = movie.filter((movie) => favorites.includes(movie.id));
  const token = localStorage.getItem("token");

  const delFavorite = (id) => {
    fetch(`https://movies-guide.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (response.ok) {
      console.log("Login response: ", response);
      alert(" delete");
      return response.json();
      } else {
      alert("Failed to delete");
      return false;
      }
      }) .then(user => {
        if (user) {
          updateUser(user);
        
         window.location.reload()
         
            
            
        }
    })
      
      .catch((e) => {
        alert(e);
      });
  };

  return (
   
      <Row className="justify-content-md-center">
      {filteredMovies.map((movie) => (
        <Col className="mb-3" key={movie.id}  xs={6} md={3} >
          <Card className="h-100 " style={{ border: "5px solid #8b7e07" }}>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body style={{ backgroundColor: "rgb(38, 0, 54)" }}>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.director}</Card.Text>

              <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Button variant="link">Open</Button>
              </Link>
              <Link to={`/`}>
              <Button onClick={() => delFavorite(movie.id)} variant="link">
                              Delete
                    </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
      </Row>
    
  );
};
