import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import HealthcareApi from '../../api';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { v4 as uuidv4 } from "uuid";
import moment from 'moment';
// import "./ProfileForm.css";

/** ApptUpdateForm
 * 
 * Props:
 *  - appt{
    patient_first_name,
    patient_last_name,
    doctor_id,
    appt_date,
    appt_time,
    kind,
    id
  }
 *  - updateAppointment --> fn
 *  - setClicked --> fn
 * State:
 *  - formData
 *  - formError
 *  - doc 
 */

function ApptEditForm({appt, updateAppointment, setClicked, doc}) {
  const {
    patient_first_name,
    patient_last_name,
    appt_date,
    appt_time,
    kind,
    doctor,
    id
  } = appt;


  const initialState = {
    patient_first_name,
    patient_last_name,
    appt_date,
    appt_time,
    kind,
    doctor
  };



  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(null);

  const [docNames, setDocNames] = useState([]);

  const history = useHistory();

  /** Sets form data to represent user input */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  };



      // get doctors full names to use in update and add appt forms
 useEffect(() => {
    async function getDoctorsNames() {
      const res = await HealthcareApi.getDoctors();
      const names = res.map(d => `${d.first_name} ${d.last_name}`)
      setDocNames(docNames => names);
    };
    getDoctorsNames();
 }, []);
  
  

  function updateObj(obj) { 
    const objCopy = { ...obj }
    
    const [doctor_First_Name, doctor_Last_Name ] = objCopy.doctor.split(" ");

    objCopy.appt_date = moment(objCopy.appt_date).format("YYYY-MM-DD");
    objCopy.doctor_First_Name = doctor_First_Name
    objCopy.doctor_Last_Name = doctor_Last_Name

    delete objCopy.doctor;
    return objCopy;
  }

  
  async function handleSubmit(evt) {

    evt.preventDefault();
    try {

      const updatedData = updateObj(formData)
      await updateAppointment(id, updatedData);
      
      setFormData(initialState);
      history.push("/appointments");
    } catch (err) {
      setFormError(err);
    };
  }



  return (
    <div className="ApptUpdateForm col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h3 className="mb-5 mt-5">Edit {appt.patient_first_name} {appt.patient_last_name} appointment!</h3>
      <Card>
        <Card.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form onSubmit={handleSubmit}>

          <Form.Group controlId="ApptUpdateFormPatientFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={patient_first_name}
              name="patient_first_name"
              value={formData.patient_first_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
            
          <Form.Group controlId="ApptUpdateFormPatientLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={patient_last_name}
                name="patient_last_name"
                value={formData.patient_last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
          <Form.Group controlId="ApptUpdateFormDoctor">
              <Form.Label>Doctor</Form.Label>
              <Form.Select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option defaultValue={doctor}>{doctor}</option>
                {docNames.filter(d => d !==doctor).map(d => (
                <option value={d} key={uuidv4()}>{ d }</option>
              ))}
              </Form.Select>
            </Form.Group>

           <Form.Group controlId="ApptUpdateFormFormDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={moment(formData.appt_date).format("YYYY-MM-DD")}
                name="appt_date"
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="ApptUpdateFormTime">
              <Form.Label>Appointment Time</Form.Label>
              <Form.Control
                type="time"
                required
                //moment(formData.appt_time, ["hh.mm"]).format("hh:mm a")
                value={formData.appt_time}
             
                name="appt_time"
                onChange={handleChange}
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
              <option defaultValue={kind}>{kind}</option>
                {kind === "New Patient" ?
                  <option value="Follow-up">Follow-up</option>
                  : 
                  <option value="New Patient">New Patient</option>      
              }
              </Form.Select>
            </Form.Group>
      
            <br />
            <Button className="ApptUpdateForm-EditButton"
              variant="primary"
              type="submit">
              Save
            </Button>
              &nbsp;&nbsp;
            <Button className="ApptUpdateForm-GoBackButton"
              variant="dark"
              onClick={()=> setClicked(false)} 
              >
              Go Back!
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </div>
  )
}

export default ApptEditForm;