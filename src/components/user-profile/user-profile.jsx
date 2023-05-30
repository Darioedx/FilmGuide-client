import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";



export const ProfileView = ({ token ,  user}) => {

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthdate, setBirthdate] = useState("");
    console.log("hola"+user.Username)
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
      }
  })
  .catch(e => {
      alert(e);
  })};
 return(
 <Form onSubmit={handleSubmit}>
  <Form.Group>
      <Form.Label>Username:</Form.Label>
      <Form.Control
          type="text"
          value={Username}
          onChange={e => setUsername(e.target.value)}
          required
          minLength="5"
          className="bg-light"
      />
  </Form.Group>
  <Form.Group>
      <Form.Label>Password:</Form.Label>
      <Form.Control
          type="password"
          value={Password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength="8"
          className="bg-light"
      />
  </Form.Group>
  <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control
          type="email"
          value={Email}
          onChange={e => setEmail(e.target.value)}
          required
          className="bg-light"
      />
  </Form.Group>
  <Form.Group>
      <Form.Label>Birthdate:</Form.Label>
      <Form.Control
          type="date"
          value={Birthdate}
          onChange={e => setBirthdate(e.target.value)}
          required
          className="bg-light"
      />
  </Form.Group>
  <Button className="mt-3" variant="primary" type="submit">Submit</Button>
</Form>
 )
   
  }
