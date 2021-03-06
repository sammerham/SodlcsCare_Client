import React, { useEffect, useState } from "react";
import HealthcareApi from '../../api';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ApptEditForm from './ApptEditForm';
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";
import moment from 'moment';
    
const ApptDetails = () => {
  const [appt, setAppt] = useState(null);
  const [clicked, setClicked] = useState(false);
  const { id } = useParams();
  const history = useHistory();


  // fn to call api and get a single user by username
  const getSingleApptById  = async (id) => { 
    try {
      const resAppt = await HealthcareApi.getFullApptInfoById(id);
      setAppt(a => resAppt);
    } catch (e) {
     console.log('err in get user details', e)
    }
  }

  // fn to call api and update user by username
  const updateAppointment = async (id, data) => { 
    try {
      await HealthcareApi.updateAppt(id, data);
      // setAppt(a => res);
    } catch (e) {
     console.log('err in get user details', e)
    }
  }

  const handleDelete = async () => {
    await HealthcareApi.removeAppt(id);
    history.push('/appointments')
  } 

  const handleUpdateClick = () => setClicked(true);


  useEffect(() => {
    getSingleApptById(id);
  }, [id])

  
  if (appt === null) {
    return (<div className="UserDetails"><h1>Loading...</h1></div>);
  }


  return (

    <div>
      {clicked ?
      <ApptEditForm appt={appt} updateAppointment={updateAppointment} setClicked={setClicked}/>
        :
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link" href={`/appointments`}>Go Back!</a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <h4 className="card-title mb-4 mt-4">{appt.patient_first_name} {appt.patient_last_name}'s Appointment page!</h4>
          <p className="card-text"><b>Patient Name:</b> {appt.patient_first_name} {appt.patient_last_name}</p>
          <p className="card-text"> <b>Doctor:</b> {appt.doctor} </p>
          <p className="card-text"><b>Date:</b> {moment(appt.appt_date).format("MMMM Do YYYY")}</p>
          <p className="card-text"><b>Time:</b> {moment(appt.appt_time, ["hh.mm"]).format("hh:mm a")}</p>
          <p className="card-text"> <b>Type:</b> {appt.kind} </p>
          <Button variant="warning" onClick={handleUpdateClick}>Update</Button> 
          &nbsp;&nbsp;
          <Button variant="danger" onClick={handleDelete}>Cancel</Button>        
        </div>
      </div>
      }
    </div>
  );
}

export default ApptDetails;