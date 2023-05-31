import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="none" expand="lg">
      <Container>
               
         {user && (<>
              <>
                  
                  <Link as={Link} to="/users" style={{ }} >al perfil</Link>
                 </>
              <>
                <Nav.Link style={{}}as={Link} to="/"> Home </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ }} onClick={onLoggedOut}>Logout</Nav.Link>
              </>
              </> )}
         
       
      </Container>
    </Navbar>
  );
};

