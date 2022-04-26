import React, { useState } from 'react'
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import HealthcareApi from '../../api';

const UserAddForm = () => {
  const initialState = {
    username:"",
    firstName:"",
    lastName:"",
    email:"",
    password: "",
    isAdmin:false
  };
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(null);
  const history = useHistory();

   /** Sets form data to represent user input */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    try {
      await HealthcareApi.addUser(formData);
      setFormData(initialState);
      history.push("/users");
    } catch (err) {
      setFormError(err);
    };
  }


  return (
    <div className="ProfileForm col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-5">
      <h3 className='mb-4'>Add User</h3>
      <Card>
        <Card.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="ProfileFormUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="ProfileFormFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              </Form.Group>
            <Form.Group controlId="ProfileFormlastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="ProfileFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group controlId="ProfileFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group >
            <br />
            <Form.Group>
                <Form.Check 
                  type="radio"
                  name="isAdmin"
                  onChange={handleChange}
                  value={true}
                  label="Admin"
                />
                <Form.Check 
                  type="radio"
                  name="isAdmin"
                  onChange={handleChange}
                  value={false}
                  label="Not Admin"
                />
            </Form.Group>
            <br />
            <Button className="ProfileForm-SubmitButton"
              variant="primary"
              type="submit">
              Add User
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="ProfileForm-CancelButton"
              variant="danger"
              onClick={()=>history.push("/users")}
              >
              Cancel
            </Button>
            
          </Form>
        </Card.Body>
      </Card>
    </div>
    
  )
}

export default UserAddForm