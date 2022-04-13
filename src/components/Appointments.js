import React, { useEffect, useState} from 'react'
import SearchForm from './SearchForm';
import HealthcareApi from '../api';
import { v4 as uuidv4 } from "uuid";

const Appointments = () => {
  const [appts, setAppts] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [apptsErrs, setApptsErrs] = useState([]);
  const [allButtonClikced, setAllButtonClicked] = useState(false);

  // handle search click
  const handleSearchClicked = () => {
    setClicked(true);
    setApptsErrs([]);
    setAllButtonClicked(true)
  }
   

// fn to get all appts 
  async function getAllAppts() {
      try {
        const appts = await HealthcareApi.getAppts();
        setAppts(oldAppts => appts);
        setApptsErrs([]);
        setClicked(false);
        setAllButtonClicked(false)
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
      <h1>Appointments</h1>
      {clicked ? <SearchForm
        setAppts={setAppts}
        setClicked={setClicked}
        setApptsErrs={setApptsErrs}
        searchFunc={getApptsAfterSearch}
        setAllButtonClicked={setAllButtonClicked}
        />
        :
        <>
          {apptsErrs.length !== 0 && apptsErrs.map(err => (
            <div key={uuidv4()}>
              {err}
            </div>
          ))}
        
          {appts.length !== 0 && appts?.map(a => (
            <div key={a.id}>
              {a.patient_first_name}
            </div>
          ))}
        </>
      }
      {!clicked && <button onClick={handleSearchClicked}>Search for an Appointment</button> }
      <br />
      {allButtonClikced && <button onClick={() => getAllAppts()}>See All Appointments</button>}
    

    </div>
  )
}

export default Appointments;