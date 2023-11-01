import { Button, Form , Col, Card} from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
//generate ramdom number for  key


export const SimilarMov = ({movies}) => {

  const { movieId } = useParams();
 
  token = localStorage.getItem("token")
  
  
  const movie = movies.find((movie) => movie.id === movieId);

 
  const genreToFilter = movie.genre[0];
  
  let similarMovies = movies.filter(movie => movie.genre.includes(genreToFilter));
  similarMovies = similarMovies.filter(function (movies) {//cambiar arrow func?
    return movies.title !== movie.title;})
  


return(
 <div>
             similar movies:
    
         {similarMovies.map((movie, index) => (

     <div key={movie.id}><Link  to={`/movies/${encodeURIComponent(movie.id)}`}>"{movie.title}"</Link></div>

 
     ))}
        {similarMovies.length === 0 ?<span> Not similar found</span>
        :''} 
</div>
)



}