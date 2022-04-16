import { useEffect, useState,useContext } from "react";
import HealthcareApi from '../../api';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DoctorProfileForm from "./DoctorProfileForm";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";
import HealthContext from '../../healthContext';

    
const DoctorDetails = () => {
  const [doctor, setDoctor] = useState(null);
  const [clicked, setClicked] = useState(false);
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
  // getDoctorApptsById(id)
  // getDoctorApptsByIdDate(id, data)
  // fn to call api and update user by username
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

  const handleUpdateClick = () => setClicked(true);
  useEffect(() => {
    getSingleDoctor(id);
  }, [id])

// deleteUser(username)
  
//updateUser(username, data)
  if (doctor === null) {
    return (<div className="UserDetails"><h1>Loading...</h1></div>);
  }
  console.log('clicked in doctor details --->>', clicked)

  return (

    <div>
      {clicked ?
        <DoctorProfileForm doctor={doctor} updateDoctorProfile={updateDoctorProfile} />
        :
      <div className="DoctorDetails">
        <b>Name:</b> {doctor.first_name} {doctor.last_name}
        <br />
        <b>Email:</b> {doctor.email}
        <br />
          <br />
          {admin &&
          <>
            <Button variant="warning" onClick={handleUpdateClick}>Update</Button> 
              &nbsp;&nbsp;
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </>
          }
          &nbsp;&nbsp;
          <Button variant="info"> All Appointments</Button>
          &nbsp;&nbsp;
          <Button variant="info"> Appointments By Date</Button>
          &nbsp;&nbsp;
        <Link to={`/doctors/`}><Button variant="dark">Go Back!</Button></Link>
      </div>
      }
    </div>
  );
}

export default DoctorDetails;