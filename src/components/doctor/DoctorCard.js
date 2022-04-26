import React from 'react'
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import './DoctorCard.css'

const DoctorCard = ({ doctor }) => {
  const { id, first_name, last_name, email } = doctor;
  return (
    <Link to={`/doctors/${id}`}  >
      <Card className="DoctorCard">
        <Card.Body>
          <b>Name:</b> {first_name} {last_name}
          <br />
          <b>Email:</b> {email}
        </Card.Body>
      </Card>
    </Link>
  )
}

export default DoctorCard;