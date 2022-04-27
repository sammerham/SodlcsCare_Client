import React, { useEffect, useState,useContext } from "react";
import HealthcareApi from '../../api';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DoctorProfileForm from "./DoctorProfileForm";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";
import HealthContext from '../../healthContext';
import { Card } from "react-bootstrap";


    
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

    <>
    
    {updateClicked ?
        
      <DoctorProfileForm doctor={doctor} updateDoctorProfile={updateDoctorProfile} />
        :
        
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link" href={`/doctors/${id}/appts/`}>Today's Appointments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={`/doctors/${id}/appts/date`}>Appointments By Date</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={`/doctors`}>Go Back!</a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <h4 className="card-title mb-4 mt-4">Dr.{doctor.last_name}'s Page!</h4>
          <p className="card-text"><b>Name:</b> {doctor.first_name} {doctor.last_name}</p>
          <p className="card-text"><b>Email:</b> {doctor.email}</p>
          {admin &&
            <div>
              <Button variant="warning" onClick={handleUpdateClick}>Update</Button> 
                &nbsp;&nbsp;
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
          }
        </div>
      </div>    
    }
      
    </>
  );
}

export default DoctorDetails;