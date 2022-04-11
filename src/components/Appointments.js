import React, {useContext} from 'react'
import SearchForm from './SearchForm'
import HealthContext from '../healthContext';

const Appointments = () => {
    const {
    getAllAppts,
    getApptsAfterSearch,
    appts,
    searchErrs,
    searchClicked,
    setSearchClicked,
    displayResults,
    setDisplayResults
    } = useContext(HealthContext);
  
  
  console.log('display appts --->>', displayResults)
  console.log('search Clicked --->>', searchClicked)
  
  const handleSearchClicked = () => {
    setDisplayResults(false);
    setSearchClicked(true);
  };


  const handleAllApptsClicked = () => {
    setDisplayResults(true);
    setSearchClicked(false)
    getAllAppts()
  }

  console.log('errs---->>', searchErrs)
  console.log('appts in appts comp---->>', appts)
  return (
      <div>
        <h1>Appointments</h1>
        <button onClick={handleSearchClicked}>Search for an Appointment</button>
        <button onClick={handleAllApptsClicked}>See all Appointments</button>
        {searchClicked && <SearchForm searchFunc={getApptsAfterSearch}/>}

        {searchErrs.length !== 0 && searchErrs.map(err => (
          <div>
            {err}
          </div>
        ))}
        
        {displayResults && appts?.map(a => (
            <div>
              {a.patient_first_name}
          </div>
        ))}
    </div>
  )
}

export default Appointments