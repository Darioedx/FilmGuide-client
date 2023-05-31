import React from "react";
import { useState } from "react";
import { Button, Form} from "react-bootstrap";

import { Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movies-guide.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
      .catch((e) => {
        alert("Something went wrong");
      });
  };


  return (<>
    
    <Form className="m-3" onSubmit={handleSubmit}>
     <br></br>  <br></br>
     <Form.Label className="m-3" ><h1>Welcome to my blalalalala</h1></Form.Label> 
     <br></br>  <br></br>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength="3"/>
      </Form.Group>
     
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </Form.Group>
      
      <Button className="m-3" variant="outline-warning" type="submit">Login</Button>
      <Nav.Link as={Link}   to="/signup" > signup  </Nav.Link>
    </Form>
    </>);
};




