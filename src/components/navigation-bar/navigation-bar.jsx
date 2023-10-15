
import { Navbar, Container, Nav,Form ,Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";


export const NavigationBar = ({ user, onLoggedOut, backHome, onFavorite, handleOnChange,isChecked, unchecked,}) => {
  const visibility= () =>{
  
    let x = document.getElementById("checkBox");
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } 
  }
  const deschek = (x)=>{
    const genreTounchkd = ["horror",  "comedy", "drama","thriller"];

    const result = genreTounchkd.filter((genres) => genres != x);
    result.forEach(element => {
          unchecked(element)
      
    });

  }

 const checkBstyle={

       
   display : 'inline-flex',
     padding: '8px',
 textDecoration: 'underline'
     
  }

return (<>
    <Navbar bg="none" expand="lg">
      <Container >
               
         {user && (<> <Nav.Link as={Link} style={{position:'absolute', right: '-15%', top: '-25%'}} to="/signup" onClick={onLoggedOut}>Logout</Nav.Link>
             <Row >
                <Col style={{}}  >
             <>
                 <Nav.Link style={checkBstyle}as={Link} to="/"  onClick={onFavorite}  > My favorites </Nav.Link>
                  <Nav.Link style={checkBstyle} as={Link} to="/users"  >al perfil</Nav.Link>
             </>
          
              <>
                <Nav.Link as={Link} style={checkBstyle} to="/" onClick={backHome}> Home </Nav.Link>
                
              </>  </Col>
              </Row>
              <Row style={{}}>
              <Col style={{display:'block' }}  id="checkBox">
            
            
             <Form style={checkBstyle} >
               <Form.Check type= "checkbox" aria-label="radio 1"  className="box" id="comedy" value="comedy"checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;deschek(e.target.value)}}/>
               <Form.Check.Label>'comedy'</Form.Check.Label>
             </Form>
             <Form style={checkBstyle}>
               <Form.Check type= "checkbox"  aria-label="radio 1" id="horror" className="box" value="horror" checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;deschek(e.target.value)}}/>
               <Form.Check.Label >'horror'</Form.Check.Label>             
             </Form>
             <Form style={checkBstyle} >
               <Form.Check type= "checkbox"  aria-label="radio 1" id="drama" className="box" value="drama" checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;deschek(e.target.value)}}/>
               <Form.Check.Label>'drama'</Form.Check.Label>             
             </Form>
             <Form style={checkBstyle}>
               <Form.Check type= "checkbox"  aria-label="radio 1" id="thriller" className="box" value="thriller" checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;deschek(e.target.value)}}/>
               <Form.Check.Label>'thriller'</Form.Check.Label>             
             </Form>
            
          
             </Col>
             </Row>
           </> 
        
              
              
              )}
         
       
      </Container>
    </Navbar>
    
          </>   
  
  );
};
//Utilizar un replace?
//user&& renderizado condicional; renderizará la nav bar si user === true ya que en mainView no le puse condicional