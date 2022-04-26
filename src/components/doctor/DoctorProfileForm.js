import { useHistory } from "react-router";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";


/** UserProfileForm
 * 
 * Props:
 *  - editProfile()
 *  - currentUser {username, firstName, lastName, email,...}
 * 
 * State:
 *  - formData
 *  - formError
 */

function DoctorProfileForm({doctor, updateDoctorProfile}) {

  const { id, first_name, last_name, email } = doctor;
  
  console.log(doctor, 'doctor in update')
  let initialState = {
    firstName:first_name,
    lastName:last_name,
    email
  };

  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(null);

  const history = useHistory();

  /** Sets form data to represent user input */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  };

 
  async function handleSubmit(evt) {

    evt.preventDefault();
    try {
      await updateDoctorProfile(id, formData)
      setFormData(initialState);
      history.push("/doctors");
    } catch (err) {
      setFormError(err);
    };
  }

  
  return (
    <div className="DoctorProfileForm col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h3 className="mb-5 mt-4">Edit Dr.{last_name}'s Profile</h3>
      <Card>
        <Card.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form onSubmit={handleSubmit}>


            <Form.Group controlId="DoctorProfileFormFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text"
                placeholder={first_name}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="ProfileFormLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text"
                placeholder={last_name}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="ProfileFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
                placeholder={email}
                name="email"
                value={formData.email}
                onChange={handleChange} />
            </Form.Group>            
            <br />
            <Button className="ProfileForm-EditButton"
              variant="primary"
              type="submit">
              Save
            </Button>
              &nbsp;&nbsp;
            <Button className="ProfileForm-CancelButton"
              variant="danger"
              onClick={()=> history.push(`/doctors`)}
              >
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default DoctorProfileForm;