
import { Button, Form , Col, Card} from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//generate ramdom number for  key
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const MovieView = ({user ,movies, updateUser,onFavorite}) => {
  const { movieId } = useParams();
 
  token = localStorage.getItem("token")
  
  
  const movie = movies.find((movie) => movie.id === movieId);
  let movieIsthere 
   
  const addFavorite = () => {
   //check if movie is allready added to favorites   
      user.FavoritesMovies.forEach(element => {///cambiar esto a find para que no itinere toda la array
        
        if (element === movieId ){
          
         movieIsthere = element

         console.log(movieIsthere)
            }
        });
        if (movieIsthere){
          alert("Movie is allready there¡¡¡¡¡")
        }
    
/////if movie no allready added, continue...

      if(!movieIsthere) {
        
        fetch(`https://movies-guide.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
         }) .then(response => {
              if (response.ok) {
            
              return response.json();
             } else {
              alert("Failed to add");
              return false;
          }
         })
            .then(user => {
              if (user) {
         
         
           
            updateUser(user);
            
            alert("Successfully added movie");
              
              
              
          }
      })
         .catch(e => {
            alert(e);
      })}}
  
  
      
      
   
  return (
    
   <div key={movie.id} style={{marginLeft:"30%"}} >
    <div>
      <img src={movie.image} className="mt-3 mb-3" alt="movie poster"/>
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
      <span >Genre: </span>
      <span key={getRndInteger(130, 600)}>{movie.genre.map((genre, index) => (
    <>
      {genre}
      {index < movie.genre.length - 1 ? ", " : ""}
      {index === movie.genre.length - 1 ? "." : ""}
    </>
  ))}
  </span>
    </div>
    <div>
      <span>Director: </span>
      <span >{movie.director}</span>
    </div>
    <div>
      <span>Actors: </span>
      <span key={getRndInteger(135, 600)} >
          {movie.actors.map((actors, index) => (
    <>
          {actors}
          {index < movie.actors.length - 1 ? ", " : ""}
          {index === movie.actors.length - 1 ? "." : ""}
    </>
  ))}
      
      </span>
    </div>
    <div>
      <span>falta añadir 'SIMILARES MOVIES'</span>
      <span ></span>
    </div>
   
    <>
     
      <Link to={`/`}>
        <Button style={{cursor: "pointer"}} className="m-3" variant="outline-warning">Back</Button>
      </Link>

      
      <Link to={`/`}>
      <Button onClick={addFavorite} style={{cursor: "pointer"}} className="m-3" variant="outline-warning">Add to favorites</Button>
      </Link>
     
      
      
      </>
    </div>
    
  );
};
            
 
