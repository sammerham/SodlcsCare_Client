import React, { useEffect, useState} from 'react'
import SearchForm from '../SearchForm';
import HealthcareApi from '../../api';
import { v4 as uuidv4 } from "uuid";
import ApptCard from './ApptCard';
import Pagination from '../Pagination';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import apptsComp from '../../assets/apptsComp.png';
import Image from 'react-bootstrap/Image'

import moment from 'moment';



const Appointments = () => {
  const [appts, setAppts] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [apptsErrs, setApptsErrs] = useState([]);
  
  // pagination
  const [currPage, setCurrPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const lastItemIdx = currPage * itemsPerPage;
  const firstItemIdx = lastItemIdx - itemsPerPage;
  // const currDate = moment().format("YYYY-MM-DD");
  // const newCurrAppts = appts.filter(appt => moment(appt.appt_date).format("YYYY-MM-DD") >= currDate);
  // const currAppts = newCurrAppts.slice(firstItemIdx, lastItemIdx);
  const currAppts = appts.slice(firstItemIdx, lastItemIdx);
  const paginate = num => setCurrPage(num);
  
  // moment(.appt_date).format("YYYY-MM-DD");
  
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
          <h3 className='mt-5 mb-5'>Search for an Appointment!</h3>
          <SearchForm
            setClicked={setSearchClicked}
            searchFunc={getApptsAfterSearch}
            goBack={ getAllAppts}  
          />
          </>
        :
        <>    
          <Image src={apptsComp} className='image mb-5 mt-3'></Image> 
       
          {apptsErrs.length !== 0 && apptsErrs.map(err => (
            <div key={uuidv4()}>
              {err}
            </div>
          ))}
        
          <ul style={{listStyle:'none'}}>
            {appts.length !== 1 && <Link to={`/appointments/appt/add`}><Button variant="success" className="mb-4">Book Appointment!</Button></Link>}
             &nbsp;&nbsp;
           {!searchClicked && <Button variant="warning" className="mb-4" onClick={handleSearchClicked}>Search for Appointment</Button>} 
          &nbsp;&nbsp;
          {appts.length === 1 && <Button variant="dark" onClick={() => getAllAppts()}>Go Back!</Button>}
            {appts.length !== 0 && currAppts?.map(appt => (
              <ApptCard appt={appt} key={appt.id}/>
            ))}
             <Pagination totalItems={appts.length} itemsPerPage={itemsPerPage} paginate={paginate}/>
          </ul>
        </>
      }
      
      
    </div>
  )
}

export default Appointments;