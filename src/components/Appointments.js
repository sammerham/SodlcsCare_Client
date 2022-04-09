import React, {useContext} from 'react'
import SearchForm from './SearchForm'
import HealthContext from '../healthContext';

const Appointments = () => {
  const { setApptSearchData } = useContext(HealthContext);
  return (
    <div>
      <h1>Appointments's Page</h1>
      <SearchForm searchFunc={setApptSearchData}/>
    </div>
  )
}

export default Appointments