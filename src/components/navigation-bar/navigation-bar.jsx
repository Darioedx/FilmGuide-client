import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, emptyFav, onFavorite }) => {
  return (
    <Navbar bg="none" expand="lg">
      <Container>
               
         {user && (<>
              <>
                 <Nav.Link style={{}}as={Link} to="/"  onClick={onFavorite}  > My favorites </Nav.Link>
                  <Link as={Link} to="/users" style={{ }} >al perfil</Link>
                 </>
              <>
                <Nav.Link style={{}}as={Link} to="/"  onClick={emptyFav}  > Home </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ }} onClick={onLoggedOut}>Logout</Nav.Link>
              </>
              </> )}
         
       
      </Container>
    </Navbar>
  );
};

