import { useEffect, useState,useContext } from "react";
import HealthcareApi from '../../api';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ApptEditForm from './ApptEditForm';
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";
import HealthContext from '../../healthContext';

    
const ApptDetails = () => {
  const [appt, setAppt] = useState(null);
  const [clicked, setClicked] = useState(false);
  const { id } = useParams();
  const history = useHistory();


  console.log('id in appt details --->>', id)
// {
//     "id": 2,
//     "patient_first_name": "Sam",
//     "patient_last_name": "Samuel",
//     "doctor_id": 1,
//     "appt_date": "2021-12-04T08:00:00.000Z",
//     "appt_time": "15:00:00",
//     "kind": "New Patient"
// }




  
  // fn to call api and get a single user by username
  const getSingleApptById = async (id) => { 
    try {
      const res = await HealthcareApi.getApptById(id);
      setAppt(res);
    } catch (e) {
     console.log('err in get user details', e)
    }
  }

  // let {first_name, last_name} = HealthcareApi.getDoctorById(appt.doctor_id);

  // fn to call api and update user by username
  const updateAppointment = async (id, data) => { 
    try {
      const res = await HealthcareApi.updateAppt(id, data);
      setAppt(res);
    } catch (e) {
     console.log('err in get user details', e)
    }
  }

  const handleDelete = async (id) => {
    await HealthcareApi.removeAppt(id);
    history.push('/appointments')
  } 

  const handleUpdateClick = () => setClicked(true);


  useEffect(() => {
    getSingleApptById(id);
  }, [id])

// deleteUser(username)
  
//updateUser(username, data)
  if (appt === null) {
    return (<div className="UserDetails"><h1>Loading...</h1></div>);
  }
  console.log('clicked in user details --->>', clicked)

  return (

    <div>
      {clicked ?
        <ApptEditForm appt={appt} updateAppointment={updateAppointment} />
        :
      <div className="ApptDetails">
        
        <b>Patient Name:</b> {appt.patient_first_name} {appt.patient_last_name}
        <br />
        {/* <b>Doctor:</b> Dr. {first_name} { last_name} */}
        <br />
        <b>Date:</b> {appt.appt_date}
        <br />
        <b>Time:</b> {appt.appt_time}
        <br />
        <b>Type:</b> {appt.kind}
        <br />
          <Button variant="warning" onClick={handleUpdateClick}>Update</Button> 
          &nbsp;&nbsp;
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
          &nbsp;&nbsp;
        <Link to={`/appointments`}><Button variant="dark">Go Back!</Button></Link>
      </div>
      }
    </div>
  );
}

export default ApptDetails;