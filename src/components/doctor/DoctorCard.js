import React from 'react'
import { Link } from 'react-router-dom';


const DoctorCard = ({ doctor }) => {
  const { id, first_name, last_name, email } = doctor;
  return (
    <Link to={`/doctors/${id}`}>
      <li>
        <b>Name:</b> {first_name} {last_name}
        <br />
        <b>Email:</b> {email}
        <br />
        <br />
      </li>
    </Link>
  )
}

export default DoctorCard;