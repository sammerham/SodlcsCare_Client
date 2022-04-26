import React, { useEffect, useState,useContext } from "react";
import HealthcareApi from '../../api';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DoctorProfileForm from "./DoctorProfileForm";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";
import HealthContext from '../../healthContext';
// import { Card } from "react-bootstrap";


    
const DoctorDetails = () => {
  const [doctor, setDoctor] = useState('null');
  const [updateClicked, setUpdateClicked] = useState(false);


  const { id } = useParams();
  const history = useHistory();
  const { admin } = useContext(HealthContext);
  

  // fn to call api and get a single user by username
  const getSingleDoctor = async (id) => { 
    try {
      const res = await HealthcareApi.getDoctorById(id);
      setDoctor(res);
    } catch (e) {
     console.log('err in get user details', e)
    }
  }

  const updateDoctorProfile = async (id, data) => { 
    try {
      const res = await HealthcareApi.updateDocotor(id, data);
      setDoctor(res);
    } catch (e) {
     console.log('err in get user details', e)
    }
  }

  const handleDelete = async () => {
    await HealthcareApi.removeDocotor(id);
    history.push('/doctors')
  } 

  const handleUpdateClick = () => setUpdateClicked(true);
  useEffect(() => {
    getSingleDoctor(id);
  }, [id])


  
//updateUser(username, data)
  if (doctor === null) {
    return (<div className="UserDetails"><h1>Loading...</h1></div>);
  }


  return (

    <div>
      
      {updateClicked ?
        
        <DoctorProfileForm doctor={doctor} updateDoctorProfile={updateDoctorProfile} />
        :

        <div className="DoctorDetails">

          {/* //! #1 doc details */}
          <>
            <br />
            <br />
            <br />
          <b>Name:</b> {doctor.first_name} {doctor.last_name}
          <br />
          <b>Email:</b> {doctor.email}
          <br />
          <br />
          </>

    

      {/* //! #3 all apptsm - date appts button */}
          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center'}}>
            {/* <Link to={`/doctors/${id}/appts/`}><Button variant="info">Dr. {doctor.last_name}'s Appointments</Button></Link> */}
            <Link to={`/doctors/${id}/appts/`}><Button variant="info">Today's Appointments</Button></Link>
            &nbsp;&nbsp;
            {/* <Button variant="info" onClick={handleSearchDateClick}> Appointments By Date</Button> */}
            <Link to={`/doctors/${id}/appts/date`}><Button variant="info" >Appointments By Date</Button></Link>
          </div>
          <br />
          

    {/* //! #2 doc admin buttons */}
          {admin &&
          <>
            <Button variant="warning" onClick={handleUpdateClick}>Update</Button> 
              &nbsp;&nbsp;
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </>
          }
          <br />
          <br />

          {/* //! #4 all go back button */}
          
        <Link to={`/doctors/`}><Button variant="dark">Go Back!</Button></Link>
      </div>
      }
    </div>
  );
}

export default DoctorDetails;