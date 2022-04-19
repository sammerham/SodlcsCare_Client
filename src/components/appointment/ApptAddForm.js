import React, { useState, useContext } from 'react'
import HealthContext from '../../healthContext';
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import HealthcareApi from '../../api';
import { v4 as uuidv4 } from "uuid";


const ApptAddForm = () => {
  const initialState = {
    patient_first_name:"",
    patient_last_name:"",
    doctor:"",
    date: "",
    time:"",
    kind: ""
  };
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(null);
  const history = useHistory();
  const { docNames } = useContext(HealthContext);

  
  function updateObj(obj) { 
    obj.doctor_First_Name = obj.doctor.split(' ')[0]
    obj.doctor_Last_Name = obj.doctor.split(' ')[1]
    obj.time = obj.time + ':00'
    delete obj.doctor
    return obj;
  }

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
      await HealthcareApi.addAppt(updateObj(formData));
      setFormData(initialState);
      history.push("/appointments");
    } catch (err) {
      setFormError(err);
    };
  }

  return (
    <div className="ProfileForm col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h3>Book Appointment!</h3>

      <Card>
        <Card.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="ApptAddFormPatientFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="patient_first_name"
                value={formData.patient_first_name}
                onChange={handleChange}
                required
              />
              </Form.Group>
            <Form.Group controlId="ApptAddFormPatientLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="patient_last_name"
                value={formData.patient_last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
         
            <Form.Group controlId="ApptAddFormDoctor">
              <Form.Label>Doctor</Form.Label>
              <Form.Select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option>Doctor</option>
                {docNames.map(doc => (
                  <option value={doc} key={uuidv4()}>{ doc }</option>
              ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group controlId="ApptAddFormDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={formData.date}
                name="date"
                onChange={handleChange}
                />
            </Form.Group>

            
            <Form.Group controlId="ApptAddFormTime">
              <Form.Label>Appointment Time</Form.Label>
              <Form.Control
                type="time"
                required
                value={formData.time}
                name="time"
                onChange={handleChange}
                // step={100}
                />
             </Form.Group>

            <Form.Group controlId="ApptAddFormKind">
              <Form.Label>Kind</Form.Label>
              <Form.Select
                required
                name="kind"
                value={formData.kind}
                onChange={handleChange}
              >
              <option >Type</option>
              <option value="New Patient">New Patient</option>
              <option value="Follow-up">Follow-up</option>
              </Form.Select>
            </Form.Group>
            <br />
           
            <Button className="ProfileForm-SubmitButton"
              variant="primary"
              type="submit">
              Book
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="ProfileForm-CancelButton"
              variant="danger"
              onClick={()=>history.push("/appointments")}
              >
              Cancel
            </Button>
            
          </Form>
        </Card.Body>
      </Card>
    </div>
    
  )
}

export default ApptAddForm