import React, { useState } from 'react';
import HealthcareApi from '../../api';
import { v4 as uuidv4 } from "uuid";
import ApptCard from '../appointment/ApptCard';
import Button from "react-bootstrap/Button";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import moment from 'moment';


const DocAllApptsByDate = () => {
  const [appts, setAppts] = useState([]);
  const [docName, setDocName] = useState('');
  const [date, setDate] = useState("")
  const [apptsErrs, setApptsErrs] = useState([]);
  const [searchClicked, setSearchClicked] = useState(true)
  const history = useHistory();
  const { id } = useParams()




  const handleChange = evt => {
    setDate(d => evt.target.value);
  };


  const handleSubmit = async(evt) => {
      evt.preventDefault();
    try {
      const res = await HealthcareApi.getDoctorApptsByIdDate(id, { date })
      setAppts(oldAppts => res.appts);
      setDocName(d => res.doctor);
      setApptsErrs([]);
      setDate("");
      setSearchClicked(false)
    } catch (err) {
      setSearchClicked(false);
      setApptsErrs(err);
      setAppts([]);
      setDocName("");
    };
  }

     


  return (
     
    <div style={{marginTop:50}}>
      {
        searchClicked ?
          <>
          <h3>Search for Appointment By Date</h3>
          <Form style={{
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:40
          }} onSubmit={handleSubmit}>
            <Form.Group controlId="DocApptDateForm" >
              <Form.Control
                type="date"
                required
                value={date}
                name="date"
                onChange={handleChange}
              />
              </Form.Group>
                &nbsp;&nbsp;&nbsp;
            <Button className="ApptDateSearchForm-SearchButton"
              variant="info"
              type='Submit'
            >
              Search
              </Button>
              &nbsp;&nbsp;&nbsp;
            <Button className="ApptDateSearchForm-CancelButton"
              variant="danger"
              onClick={() => history.push(`/doctors/${id}`)}
            >
              Cancel
            </Button>
          </Form>
          </>
          :

      <div>

      
       {apptsErrs.length !== 0 && apptsErrs.map(err => (
            <div key={uuidv4()} style={{color:'red'}}>
              {err}
            </div>
       ))}
       <br />
    
       {appts.length !== 0 &&
        <> 
              
          <h3> Appointments for {docName}'s on {moment(appts[0].appt_date).format("MM-DD-YYYY")}!</h3>
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
      }
    </div>
  )
}

export default DocAllApptsByDate;