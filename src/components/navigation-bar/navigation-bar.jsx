import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="none" expand="lg">
      <Container>
         
       
            {!user && (
              <>
                <Nav.Link as={Link}   to="/login" style={{}}>
                    Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
               
            {user && (
              <>
                <Nav.Link style={{}}as={Link} to="/">
                         Home 
                 </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ }} onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
         
       
      </Container>
    </Navbar>
  );
};

