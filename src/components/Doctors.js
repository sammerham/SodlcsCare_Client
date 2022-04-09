import React, {useContext} from 'react';
import SearchForm from './SearchForm';
import HealthContext from '../healthContext';

const Doctors = () => {
  const { setDocSearchData } = useContext(HealthContext);

  return (
     <div>
      <h1>Doctor's Page</h1>
      <SearchForm searchFunc={setDocSearchData}/>
    </div>
  )
}

export default Doctors