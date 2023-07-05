import { Navbar, Container, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";


export const NavigationBar = ({ user, onLoggedOut, backHome, onFavorite }) => {
  return (<>
    <Navbar bg="none" expand="lg">
      <Container>
               
         {user && (<>
             <>
                 <Nav.Link style={{}}as={Link} to="/"  onClick={onFavorite}  > My favorites </Nav.Link>
                  <Nav.Link as={Link} to="/users"  >al perfil</Nav.Link>
             </>
          
              <>
                <Nav.Link as={Link} to="/" onClick={backHome}> Home </Nav.Link>
                <Nav.Link as={Link} to="/signup" onClick={onLoggedOut}>Logout</Nav.Link>
              </>
           </> 
              
              
              )}
         
       
      </Container>
    </Navbar>
    
          </>   
  
  );
};

//user&& renderizado condicional; renderizará la nav bar si user === true ya que en mainView no le puse condicional