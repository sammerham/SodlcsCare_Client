import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import HealthContext from '../healthContext';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import "./LoginForm.css";


/** LoginForm
 * 
 * Props:
 *  - login()
 * 
 * State:
 *  -formData
 *  -formError
 *  
 *  Routes -> LoginForm
 */

const LoginForm = () => {

  const initialState = {username:"", password:""};
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(null);
  const { login} = useContext(HealthContext);
  
  const history = useHistory();

//handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  };


  // handle submit when the form submits
const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      await login(formData);
      setFormData(initialState);
      history.push("/");
    } catch (e) {
      console.log('e in login --->>', e)
      setFormError(e)
    }
  }

  return (
    <div className="LoginForm col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h3>Log In</h3>
      <Card>
        <Card.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginFormUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" 
                            placeholder="Username" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="loginFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" 
                            placeholder="Password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}/>
            </Form.Group>

            <Button className="LoginForm-button" variant="primary" type="submit">
              Log In
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LoginForm