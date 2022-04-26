import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import Card from "react-bootstrap/Card";
import './ApptCard.css'

const ApptCard = ({ appt }) => {
  const { id, patient_first_name, patient_last_name, appt_date, appt_time, kind } = appt;
  return (
    <Link to={`/appointments/${id}`}>
      <Card className="ApptCard">
        <Card.Body>
          <b>Patient Name:</b> {patient_first_name} { patient_last_name}
          <br />
          <b>Appointment Date:</b> {moment(appt_date).format("MMMM Do YYYY")}
          <br />
          {/* <b>Appointment Time:</b> {moment(appt_time).format("hh:mm a") } */}
          <b>Appointment Time:</b> {moment(appt_time, ["hh.mm"]).format("hh:mm a") }
          <br />
          <b>Appointment Type:</b> {kind}
          <br />
          <br />
        </Card.Body>
      </Card>
    </Link>
  )
}

export default ApptCard