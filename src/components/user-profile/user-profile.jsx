import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const visibility = () => {
    let x = document.getElementById("checkBox");
    if (x) { // Verifica si el elemento existe
        if (x.style.display === 'block') {
            x.style.display = 'none';
        }
    }
}




export const ProfileView = ({ token , onLoggedOut,updateUser, user}) => {
    
  visibility()
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthdate, setBirthdate] = useState("");
   
    console.log(user.Birthday.slice(0, 10))
    
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
          
            window.location.replace("/login");// cambiar para que dirij A SINGUP
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
 
  <Button  className="m-3" variant="outline-warning">Update info</Button>
  <Button onClick={deleteAccount} className="m-3" variant="outline-warning">delete</Button>
</Form>
</>)
   
  }
