
import { Button, Form , Col, Card} from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
//generate ramdom number for  key
const visibility= () =>{
  
  let x = document.getElementById("checkBox");
  if (x.style.display ='block') {
    x.style.display = 'none';
  } 
 
}

export const MovieView = ({user ,movies, updateUser}) => {

  
  visibility()
   
  const { movieId } = useParams();
 
  token = localStorage.getItem("token")
  
  
  const movie = movies.find((movie) => movie.id === movieId);
  let movieIsthere 
 
  const genreToFilter = movie.genre[0];
  
  let similarMovies = movies.filter(movie => movie.genre.includes(genreToFilter));
  similarMovies = similarMovies.filter(function (movies) {//cambiar arrow func?
    return movies.title !== movie.title;})
 
  const addFavorite = () => {
   //check if movie is allready added to favorites   
      user.FavoritesMovies.forEach(element => {///cambiar esto a find para que no itinere toda la array 
        
        if (element === movieId ){
          
         movieIsthere = element
        }
        });
        if (movieIsthere){
          alert("Movie is allready there¡¡¡¡¡")
         // window.location.replace('/')
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
           
            //window.location.replace('/')
           
          }
      })
         
         .catch(e => {
            alert(e);
      })}}
  
    
      
      
   
  return (
    
  <div style={{marginLeft:"30%" }} >
    <div>
      <img src={movie.image} className="mt-3 mb-3" style={{border: "5px solid #8b7e07"}}alt="movie poster"/>
    </div>
    <div>
      <span >Title: </span>
      <span>{movie.title}</span>
    </div>
    <div>
      <span>Plot: </span>
      <span>{movie.plot}</span>
    </div>
    <div >
      <span >Genre: </span>
      {movie.genre.map((genre, index) => (<span key={nanoid()}>
    <>
      {genre}
      {index < movie.genre.length - 1 ? ", " : ""}
      {index === movie.genre.length - 1 ? "." : ""}
    </>

      </span>  ))}
    </div>
    <div>
      <span>Director: </span>
      <span >{movie.director}</span>
    </div>
   
    <div>
      <span>Actors: </span>
      
      {movie.actors.map((actors, index) => (<span key={nanoid()}>
     <>
          {actors}
          {index < movie.actors.length - 1 ? ", " : ""}
          {index === movie.actors.length - 1 ? "." : ""}
    </>
     </span> ))}
    </div>
        
    <div>      
      <span>Watch this movie at:  </span>
      <Link to={`https://publicdomainmovie.net/movie/${movie.title.replaceAll(' ','-')}`}>"{movie.title}"</Link>
    </div>
   
     
    <> 
      <Link to={`/`}>
        <Button onClick={visibility} style={{cursor: "pointer"}} className="m-3" variant="outline-warning">Back</Button>
      </Link>   
      <Link to={`/`}>
      <Button onClick={addFavorite} style={{cursor: "pointer"}} className="m-3" variant="outline-warning">Add to favorites</Button>
      </Link>    
    </>  
  </div>
   
  );
};
            
 
