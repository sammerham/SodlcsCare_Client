import React, { useEffect, useState, useContext } from 'react'
import HealthContext from '../../healthContext.js'
import SearchForm from '../SearchForm';
import HealthcareApi from '../../api';
import { v4 as uuidv4 } from "uuid";
import DoctorCard from './DoctorCard';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import doctorsComp from '../../assets/doctorsComp.jpeg'
import Image from 'react-bootstrap/Image'

const Doctors = () => {
  const { admin } = useContext(HealthContext);
  const [doctors, setDoctors] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [doctorsErrs, setDoctorsErrs] = useState([]);
  


  // handle search click
  const handleSearchClicked = () => {
    setSearchClicked(true);
    setDoctors([]);
    setDoctorsErrs([]);
  }



// fn to call api and get all doctors
  async function getAllDoctors() { 
    try {
      const doctors = await HealthcareApi.getDoctors();
      setDoctors(oldDoctors => doctors);
      setDoctorsErrs([]);
      setSearchClicked(false);
    } catch (e) {
      setDoctorsErrs(e);
      setDoctors([])
    }
  };

    // fn to call api and  get doctor by a name

  async function getDoctorAfterSearch(formData) { 
    try {
      console.log('form Data in doc search', formData)
      const doctor = await HealthcareApi.getDoctorByName(formData);

      setDoctors(oldDoctors => [doctor]);
      setDoctorsErrs([]);
      setSearchClicked(false);
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
      {searchClicked ?
        <>
          <h3>Search for a doctor!</h3>
          <SearchForm
            setClicked={setSearchClicked}
            searchFunc={getDoctorAfterSearch}
            goBack={ getAllDoctors}  
          />
          </>
        :
        <>
          <br />
          <Image src={doctorsComp} className='image'></Image> 
          <br />
          <br />
          {doctorsErrs.length !== 0 && doctorsErrs.map(err => (
            <div key={uuidv4()}>
              {err}
            </div>
          ))}
          <ul style={{listStyle:'none'}}>
            {doctors.length !== 0 && doctors?.map(d => (
              <DoctorCard doctor={d} key={d.id}/>
            ))}
          </ul>
            { admin && doctors.length !== 1 && <Link to={`/doctors/doctor/add`}><Button variant="danger" >Add Doctor</Button></Link> }
          &nbsp;&nbsp;
        </>
      }
      {!searchClicked && <Button variant="warning" onClick={handleSearchClicked}>Find Doctor</Button>} 
          &nbsp;&nbsp;
      {(doctorsErrs.length === 1 ||doctors.length === 1 )  && <Button variant="dark" onClick={() => getAllDoctors()}>Go Back!</Button>} 
  
      
    </div>
  )
}

export default Doctors;