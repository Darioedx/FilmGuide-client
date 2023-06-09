import{ useState } from "react";
import { Button, Form} from "react-bootstrap";
import { Link } from "react-router-dom";
export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
//missing get response data in order to re-direct to home page
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://movies-guide.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } 
      else {
        alert("Signup failed");
      }
    });//catch error?
  };// agaregar logica para que redirija home
  return (
  
    <Form className="m-3" onSubmit={handleSubmit}>
       
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" value={username}onChange={(e) => setUsername(e.target.value)} required minLength="3"/>
      </Form.Group>
     
      <Form.Group controlId="formUserpassword">
        <Form.Label>Password:  </Form.Label>       
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </Form.Group>
      
      <Form.Group controlId="formUseremail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </Form.Group>
      
      <Form.Group controlId="formUserbirthday">
        <Form.Label>Birthday: </Form.Label>  
        <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required/>
      </Form.Group>
      
      <Button className="m-3" variant="outline-warning" type="submit">Sign up</Button>
     
      <Link as={Link}   to="/login" style={{}}>
                    Login
                </Link>
    </Form>
  );
};