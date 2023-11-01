
import { Navbar, Container, Nav,Form ,Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";


export const NavigationBar = ({ user, onLoggedOut, backHome, onFavorite, handleOnChange,isChecked, unchecked,}) => {
  
  const deschek = (x)=>{
    const genreTounchkd = ["horror",  "comedy", "drama","thriller","western","adventure"];

    const result = genreTounchkd.filter((genres) => genres != x);
    result.forEach(element => {
          unchecked(element)
      
    });

  }

 const checkBstyle={

       
   display : 'inline-flex',
   padding: '7px',
   textDecoration: 'underline'
     
  }

return (<>
    <Navbar bg="none" expand="lg">
      <Container >
               
         {user && (<>
             <Row style={{width:'100%'}}>
                 <Col lg={12} style={{textAlign:'center',}} >
                 <Nav.Link  style={checkBstyle} as={Link}  to="/signup" onClick={onLoggedOut}>Logout</Nav.Link>
                 </Col>
                 <Col lg={12} style={{textAlign:'center',}} >
             <>
                 <Nav.Link style={checkBstyle}as={Link} to="/"  onClick={onFavorite}  > My favorites </Nav.Link>
                  <Nav.Link style={checkBstyle} as={Link} to="/users"  >al perfil</Nav.Link>
             </>
          
              <>
                <Nav.Link as={Link} style={checkBstyle} to="/" onClick={backHome}> Home </Nav.Link>
                
              </>  </Col>
             
              <Col   style={{display:'block',textAlign:'center', }}  id="checkBox">
            
            
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
             <Form style={checkBstyle}>
               <Form.Check type= "checkbox"  aria-label="radio 1" id="western" className="box" value="western" checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;deschek(e.target.value)}}/>
               <Form.Check.Label>'western'</Form.Check.Label>             
             </Form>
             <Form style={checkBstyle}>
               <Form.Check type= "checkbox"  aria-label="radio 1" id="adventure" className="box" value="adventure" checked={isChecked} onChange={(e)=>{handleOnChange(e.target.value)
                ;deschek(e.target.value)}}/>
               <Form.Check.Label>'adventure'</Form.Check.Label>             
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