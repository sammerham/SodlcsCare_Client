import React, {useContext} from 'react'
import SearchForm from './SearchForm';
import HealthContext from '../healthContext';

const Users = () => {
  const { setUserSearchTerm } = useContext(HealthContext);
  return (
      <div>
      <h1>Users's Page</h1>
      <SearchForm func={setUserSearchTerm}/>
    </div>
  )
}

export default Users