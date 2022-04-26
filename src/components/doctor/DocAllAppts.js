import React, { useEffect, useState } from 'react';

import HealthcareApi from '../../api';
import { v4 as uuidv4 } from "uuid";
import ApptCard from '../appointment/ApptCard';
import Button from "react-bootstrap/Button";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router";
import moment from 'moment';


const DocAllAppts = () => {
  const [appts, setAppts] = useState([]);
  const [docName, setDocName] = useState('');
  const [apptsErrs, setApptsErrs] = useState([]);
  const history = useHistory();
  const { id } = useParams()
  const currDate = moment().format("YYYY-MM-DD");


  // effect to get doc appt on doc id change
  useEffect(() => {
    async function getDocAppts() {
      try {  
      // const res = await HealthcareApi.getDoctorApptsById(id);
      const res = await HealthcareApi.getDoctorApptsByIdDate(id, { date:currDate })
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
  }, [id, currDate]);


   return (
     <div style={{marginTop:50}}>

      {/* <br /> */}
       {apptsErrs.length !== 0 && apptsErrs.map(err => (
            <div key={uuidv4()} style={{color:'red'}}>
              {err}
            </div>
       ))}
       <br />
    
       {appts.length !== 0 &&
         <> 
         <h3 style={{marginBottom:30, fontStyle:'italic bold'}}> {docName}'s Appointments!</h3>
         <ul style={{listStyle:'none'}}>
            {appts.length !== 0 && appts?.map(appt => (
              <ApptCard appt={appt} key={appt.id}/>
            ))}
         </ul>
         </>
       }
       
      <Link to={`/appointments/appt/add`}><Button variant="success" >Book Appointment!</Button></Link>
      &nbsp;&nbsp;
      <Button variant="dark" onClick={() => history.push(`/doctors/${id}`)} >Go Back!</Button>
      
    </div>
  )
}

export default DocAllAppts;