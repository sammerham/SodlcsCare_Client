import React, {useContext} from 'react'
import SearchForm from './SearchForm'
import HealthContext from '../healthContext';

const Appointments = () => {
  const { setApptSearchTerm } = useContext(HealthContext);
  return (
    <div>
      <h1>Appointments's Page</h1>
      <SearchForm func={setApptSearchTerm}/>
    </div>
  )
}

export default Appointments