
import { Navbar, Container, Nav,Form ,Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";


export const NavigationBar = ({ user, onLoggedOut, backHome, onFavorite, handleOnChange,isChecked, unchecked, }) => {
  const visibility= () =>{
   onFavorite();
    let x = document.getElementById("checkBox");
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } 
  }
  const deschek = (x)=>{
    const genreTounchkd = ["horror",  "comedy", "drama","thriller"];
    ///filtrar array con el argumento
    const result = genreTounchkd.filter((genres) => genres != x);
    result.forEach(element => {
          unchecked(element)
      
    });

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
                ;deschek(e.target.value)}}/>
               <Form.Check.Label>'comedy'</Form.Check.Label>
             </Form>
             <Form>
               <Form.Check type= "checkbox" aria-label="radio 1" id="horror" className="box" value="horror" checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;deschek(e.target.value)}}/>
               <Form.Check.Label>'horror'</Form.Check.Label>             
             </Form>
             <Form>
               <Form.Check type= "checkbox" aria-label="radio 1" id="drama" className="box" value="drama" checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;deschek(e.target.value)}}/>
               <Form.Check.Label>'drama'</Form.Check.Label>             
             </Form>
             <Form>
               <Form.Check type= "checkbox" aria-label="radio 1" id="thriller" className="box" value="thriller" checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;deschek(e.target.value)}}/>
               <Form.Check.Label>'thriller'</Form.Check.Label>             
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