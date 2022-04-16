import React, { useEffect, useState} from 'react'
import SearchForm from '../SearchForm';
import HealthcareApi from '../../api';
import { v4 as uuidv4 } from "uuid";
import ApptCard from './ApptCard';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import apptsComp from '../../assets/userscomp.jpeg'
import Image from 'react-bootstrap/Image'

const Appointments = () => {
  const [appts, setAppts] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [apptsErrs, setApptsErrs] = useState([]);
  


  // handle search click
  const handleSearchClicked = () => {
    setSearchClicked(true);
    setAppts([]);
    setApptsErrs([]);
  }
   

// fn to get all appts 
  async function getAllAppts() {
      try {
        const appts = await HealthcareApi.getAppts();
        setAppts(oldAppts => appts);
        setApptsErrs([]);
        setSearchClicked(false);
      } catch (e) {
        setApptsErrs(e);
        setAppts([])
      }
  }

  // fn to get an appt by name
  async function getApptsAfterSearch(data) { 
    try {
      const appts = await HealthcareApi.getApptByName(data);
      setAppts(oldAppts => appts);
      setApptsErrs([]);
      setSearchClicked(false);
    } catch (e) {
      setApptsErrs(e);
      setAppts([])
    }
  };


  useEffect(() => {
    // fn to call api and get all appointments
    getAllAppts();
  }, []);


   return (
    <div>

      {searchClicked ?
        <>
          <h3>Search for an Appointment!</h3>
          <SearchForm
            setClicked={setSearchClicked}
            searchFunc={getApptsAfterSearch}
            goBack={ getAllAppts}  
          />
          </>
        :
        <>    
          <Image src={apptsComp} className='image'></Image> 
          <br />
          <br />
          {apptsErrs.length !== 0 && apptsErrs.map(err => (
            <div key={uuidv4()}>
              {err}
            </div>
          ))}
        
          <ul style={{listStyle:'none'}}>
            {appts.length !== 0 && appts?.map(appt => (
              <ApptCard appt={appt} key={appt.id}/>
            ))}
          </ul>
          {appts.length !== 1 && <Link to={`/appointments/appt/add`}><Button variant="success" >Book Appointment!</Button></Link>}
          &nbsp;&nbsp;
        </>
      }
      {!searchClicked && <Button variant="warning" onClick={handleSearchClicked}>Search for Appointment</Button>} 
      &nbsp;&nbsp;
      {appts.length === 1 && <Button variant="dark" onClick={() => getAllAppts()}>Go Back!</Button>}
      
    </div>
  )
}

export default Appointments;