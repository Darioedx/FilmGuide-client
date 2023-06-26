import { useState } from "react";
import { Card, Col, Form, Button ,Link} from "react-bootstrap";



export const ProfileView = ({ token , onLoggedOut,updateUser, user}) => {

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthdate, setBirthdate] = useState("");
   
    
    
    const handleSubmit = event => {
      event.preventDefault(); 
     const data = {
        Username,
        Password,
        Email,
        Birthdate
      }
   
    fetch(`https://movies-guide.herokuapp.com/users/${user.Username}`, {
      
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data),
    }) .then(response => {
      if (response.ok) {
        
          return response.json();
      } else {
          alert("Changing userdata failed");
          return false;
      }
  })
  .then(user => {
      if (user) {
          alert("Successfully changed userdata");
          updateUser(user);
          
          window.location.reload();
      }
  })
  .catch(e => {
      alert(e);
  })};

  const deleteAccount = () => {
    console.log("doin")
    fetch(`https://movies-guide.herokuapp.com/users/${user.Username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        if (response.ok) {
            alert("Your account has been deleted. Good Bye!");
            onLoggedOut();
          
            window.location.replace("/login");
        } else {
            alert("Could not delete account");
        }
    })
    .catch(e => {
        alert(e);
    });
} 

 return(<>
 
 
 <Form onSubmit={handleSubmit}>
  <Form.Group>
      <Form.Label>Username:</Form.Label>
      <Form.Control
          placeholder={user.Username}
          type="text"
          value={Username}
          onChange={e => setUsername(e.target.value)}
          required
          minLength="3"
          className="bg-light"
      />
  </Form.Group>
  <Form.Group>
      <Form.Label>Password:</Form.Label>
      <Form.Control style={{color: "red"}}
          placeholder="xxxxxxxxxxxxxxxx"
          type="password"
          value={Password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength="3"
          className="bg-light"
      />
  </Form.Group>
  <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control
          placeholder={user.Email}
          type="email"
          value={Email}
          onChange={e => setEmail(e.target.value)}
          required
          
      />
  </Form.Group>
  <Form.Group>
      <Form.Label>Birthdate:</Form.Label>
      <Form.Control
                
          type="date"
          value={Birthdate}
          onChange={e => setBirthdate(e.target.value)}
          required
        
      />
  </Form.Group>
 
  <Button className="mt-3" variant="primary" type="submit">Update info</Button>
  <Button onClick={deleteAccount} className="mt-3" variant="primary" >delete</Button>
</Form>
</>)
   
  }
