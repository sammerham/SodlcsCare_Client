import React from 'react'
import { Link } from 'react-router-dom';


// {
//     "id": 2,
//     "patient_first_name": "Sam",
//     "patient_last_name": "Samuel",
//     "doctor_id": 1,
//     "appt_date": "2021-12-04T08:00:00.000Z",
//     "appt_time": "15:00:00",
//     "kind": "New Patient"
// }



const ApptCard = ({ appt }) => {
  const { id, patient_first_name, patient_last_name, appt_date, appt_time, kind } = appt;
  return (
    <Link to={`/appointments/${id}`}>
      <li>
        <b>Patient Name:</b> {patient_first_name} { patient_last_name}
        <br />
        <b>Appointment Date:</b> {appt_date}
        <br />
        <b>Appointment Time:</b> {appt_time}
        <br />
        <b>Appointment Type:</b> {kind}
        <br />
        <br />
      </li>
    </Link>
  )
}

export default ApptCard