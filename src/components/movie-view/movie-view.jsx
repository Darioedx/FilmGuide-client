export const MovieView = ({ movie, onBackClick,onDirector, bio}) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
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
        <span key={movie.id}>{movie.actors}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
     
    </div>
    
  );
};
