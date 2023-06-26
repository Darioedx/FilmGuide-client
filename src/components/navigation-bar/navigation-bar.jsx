import { Navbar, Container, Nav,  Button, Form, TabContent } from "react-bootstrap";
import { Link } from "react-router-dom";


export const NavigationBar = ({ user, onLoggedOut, backHome, onFavorite }) => {
  return (<>
    <Navbar bg="none" expand="lg">
      <Container>
               
         {user && (<>
             <>
                 <Nav.Link style={{}}as={Link} to="/"  onClick={onFavorite}  > My favorites </Nav.Link>
                  <Link as={Link} to="/users" style={{ }} >al perfil</Link>
             </>
          
              <>
                <Nav.Link style={{}}as={Link} to="/" onClick={backHome}> Home </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ }} onClick={onLoggedOut}>Logout</Nav.Link>
              </>
           </> 
              
              
              )}
         
       
      </Container>
    </Navbar>
    
            <Form className="d-flex mt-5" style={{maxWidth: "50%", margin: "0 auto"}} >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
             />
              <Button variant="outline-warning" size="sm">FALTA</Button>
          </Form></>   
  
  );
};

