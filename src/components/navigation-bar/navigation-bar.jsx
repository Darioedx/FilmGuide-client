import{ useState } from "react";
import { Navbar, Container, Nav,Form ,Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Card} from "react-bootstrap";

export const NavigationBar = ({ user, onLoggedOut, backHome, onFavorite, handleOnChange,isChecked, unchecked, }) => {
  const visibility= () =>{
   onFavorite();
    var x = document.getElementById("checkBox")
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } 
  }

return (<>
    <Navbar bg="none" expand="lg">
      <Container>
               
         {user && (<>
             <>
                 <Nav.Link style={{}}as={Link} to="/"  onClick={visibility}  > My favorites </Nav.Link>
                  <Nav.Link as={Link} to="/users"  onClick={visibility}>al perfil</Nav.Link>
             </>
          
              <>
                <Nav.Link as={Link} to="/" onClick={backHome}> Home </Nav.Link>
                <Nav.Link as={Link} to="/signup" onClick={onLoggedOut}>Logout</Nav.Link>
              </>
             <div style={{display:"block"}} id="checkBox">
              <Form >
              <Form.Check type= "checkbox" aria-label="radio 1"  className="box" id="comedy" value="comedy"checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;unchecked('horror')}}/>
               <Form.Check.Label>'comedy'</Form.Check.Label></Form>
               <Form>
               <Form.Check type= "checkbox" aria-label="radio 1" id="horror" className="box" value="horror" checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                unchecked('comedy')}}/>
               <Form.Check.Label>'horror'</Form.Check.Label>             
              </Form>
              
              </div>
           </> 
        
              
              
              )}
         
       
      </Container>
    </Navbar>
    
          </>   
  
  );
};
//Utilizar un replace?
//user&& renderizado condicional; renderizará la nav bar si user === true ya que en mainView no le puse condicional