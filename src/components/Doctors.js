import React, {useContext} from 'react';
import SearchForm from './SearchForm';
import HealthContext from '../healthContext';

const Doctors = () => {
  const { setDocSearchTerm } = useContext(HealthContext);

  return (
     <div>
      <h1>Doctor's Page</h1>
      <SearchForm func={setDocSearchTerm}/>
    </div>
  )
}

export default Doctors