import React, { useState } from 'react'
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import HealthcareApi from '../../api';

const DoctorAddForm = () => {
  const initialState = {
    firstName:"",
    lastName:"",
    email:""
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
      await HealthcareApi.addDocotor(formData);
      setFormData(initialState);
      history.push("/doctors");
    } catch (err) {
      setFormError(err);
    };
  }


  return (
    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h3 className="mb-5 mt-5">Add Doctor</h3>
      <Card>
        <Card.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form onSubmit={handleSubmit}>
            
            <Form.Group controlId="addDoctorFormFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              </Form.Group>
            <Form.Group controlId="addDoctorFormLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addDoctorFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
      
            <br />
            <Button className="addDoctorForm-SubmitButton"
              variant="primary"
              type="submit">
              Add User
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="addDoctorForm-CancelButton"
              variant="danger"
              onClick={()=>history.push("/doctors")}
              >
              Cancel
            </Button>
      
          </Form>
        </Card.Body>
      </Card>
    </div>
    
  )
}

export default DoctorAddForm