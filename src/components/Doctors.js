import React, {useContext} from 'react';
import SearchForm from './SearchForm';
import HealthContext from '../healthContext';

const Doctors = () => {
  const {
    getAllDoctors,
    getDoctorsAfterSearch,
    doctors,
    searchErrs,
    searchClicked,
    setSearchClicked,
    displayResults,
    setDisplayResults
  } = useContext(HealthContext);


  console.log('display doctors --->>', displayResults)
  console.log('search Clicked --->>', searchClicked)
  console.log('doc comp errs --->', searchErrs)
  console.log('doc comp all --->', doctors)
  const handleSearchClicked = () => {
    setDisplayResults(false);
    setSearchClicked(true);
  };


  const handleAllDoctorsClicked = () => {
    setDisplayResults(true);
    setSearchClicked(false)
    getAllDoctors()
  }

 

  return (
    <div>
      <h1>Doctors</h1>
      <button onClick={handleSearchClicked}>Search for a doctor</button>
      <button onClick={handleAllDoctorsClicked}>See all doctors</button>
      {searchClicked && <SearchForm searchFunc={getDoctorsAfterSearch}/>}

      {searchErrs.length !== 0 && searchErrs.map(err => (
        <div>
          {err}
        </div>
      ))}
      
      {displayResults && doctors?.map(d => (
          <div>
            {d.first_name}
        </div>
      ))}
    </div>
  )
}

export default Doctors;