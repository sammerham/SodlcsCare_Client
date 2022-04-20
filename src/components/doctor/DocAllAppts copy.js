import React, { useEffect, useState } from 'react';

import HealthcareApi from '../../api';
import { v4 as uuidv4 } from "uuid";
import ApptCard from '../appointment/ApptCard';
import Button from "react-bootstrap/Button";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
// import apptsComp from '../../assets/userscomp.jpeg'
// import Image from 'react-bootstrap/Image'
import { useHistory } from "react-router";

const DocAllAppts = ({date}) => {
  const [appts, setAppts] = useState([]);
  const [docName, setDocName] = useState('');
  const [apptsErrs, setApptsErrs] = useState([]);
  // const [date, setDate] = useState('');
  const history = useHistory();
  const { id } = useParams()


  useEffect(() => {
    console.log('date in doctorallAppt', date )
    async function getDocAppts() {
      let res;
      try {
      
        if (date === "") { 
          res = await HealthcareApi.getDoctorApptsById(id);
        } else {
          res = await HealthcareApi.getDoctorApptsByIdDate(id, {date});
        }
        
        setAppts(oldAppts => res.appts);
        setDocName(d => res.doctor);
        setApptsErrs([]);
      } catch (e) {
        setApptsErrs(e);
        setAppts([]);
        setDocName("");
      }
    };
    getDocAppts();
  }, [id, date]);



   return (
     <div>
       <br />
       {appts.length !== 0 && <h3> {docName}'s Appointments!</h3>}
       
        <br />
          {apptsErrs.length !== 0 && apptsErrs.map(err => (
            <div key={uuidv4()}>
              {err}
            </div>
          ))}
        
       {appts?
          <ul style={{listStyle:'none'}}>
            {appts.length !== 0 && appts?.map(appt => (
              <ApptCard appt={appt} key={appt.id}/>
            ))}
         </ul>
         : 
         <h3>No appts</h3>
         }
        {/* {appts.length !== 1 && <Link to={`/appointments/appt/add`}><Button variant="success" >Book Appointment!</Button></Link>} */}
        <Link to={`/appointments/appt/add`}><Button variant="success" >Book Appointment!</Button></Link>
          &nbsp;&nbsp;
    
      &nbsp;&nbsp;
      <Button variant="dark" onClick={() => history.push(`/doctors`)} >Go Back!</Button>
      
    </div>
  )
}

export default DocAllAppts;