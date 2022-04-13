import React, { useEffect, useState} from 'react'
import SearchForm from './SearchForm';
import HealthcareApi from '../api';
import { v4 as uuidv4 } from "uuid";

const Doctors = () => {

  const [doctors, setDoctors] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [doctorsErrs, setDoctorsErrs] = useState([]);
  const [allButtonClikced, setAllButtonClicked] = useState(false);

  // handle search click
  const handleSearchClicked = () => {
    setClicked(true);
    setDoctorsErrs([]);
    setDoctors([]);
    setAllButtonClicked(true)
  }



// fn to call api and get all doctors
  async function getAllDoctors() { 
    try {
      const doctors = await HealthcareApi.getDoctors();
      setDoctors(oldDoctors => doctors);
      setDoctorsErrs([]);
      setClicked(false);
      setAllButtonClicked(false)
    } catch (e) {
      setDoctorsErrs(e);
      setDoctors([])
    }
  };

    // fn to call api and  get doctor by a name

  async function getDoctorsAfterSearch(formData) { 
    try {
      const doctor = await HealthcareApi.getDoctor(formData);
      setDoctors(oldDoctors => [doctor]);
      setDoctorsErrs([]);
      setClicked(false);
    } catch (e) {
      setDoctorsErrs(e);
      setDoctors([])
    }
  };

 
  useEffect(() => {
    // fn to call api and get all doctors
    getAllDoctors()
  }, []);


  return (
    <div>
      <h1>Doctors</h1>
      {clicked ? <SearchForm
        setDoctors={setDoctors}
        setClicked={setClicked}
        setDoctorsErrs={setDoctorsErrs}
        searchFunc={getDoctorsAfterSearch}
        setAllButtonClicked={setAllButtonClicked}
      />
        :
        <>
          {doctorsErrs.length !== 0 && doctorsErrs.map(err => (
            <div key={uuidv4()}>
              {err}
            </div>
          ))}
        
          {doctors.length !== 0 && doctors?.map(d => (
            <div key={d.id}>
              {d.first_name}
            </div>
          ))}
        </>
      }
       {!clicked && <button onClick={handleSearchClicked}>Search for a Doctor</button>}
        <br /> 
        {allButtonClikced && <button onClick={() => getAllDoctors()}>See All Doctors</button>}
    </div>
  )
}

export default Doctors;