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
      <div className="ApptDetails" style={{marginTop:40}}>
        
        <b>Patient Name:</b> {appt.patient_first_name} {appt.patient_last_name}
        <br />
        <b>Doctor:</b> {appt.doctor} 
        <br />
        <b>Date:</b> {moment(appt.appt_date).format("MMMM Do YYYY")}
        <br />
        <b>Time:</b> {moment(appt.appt_time, ["hh.mm"]).format("hh:mm a")}
        <br />
        <b>Type:</b> {appt.kind}
          <br />
          <br />
          <Button variant="warning" onClick={handleUpdateClick}>Update</Button> 
          &nbsp;&nbsp;
          <Button variant="danger" onClick={handleDelete}>Cancel</Button>
          &nbsp;&nbsp;
        <Link to={`/appointments`}><Button variant="dark">Go Back!</Button></Link>
      </div>
      }
    </div>
  );
}

export default ApptDetails;