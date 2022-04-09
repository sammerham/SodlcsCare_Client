import React, {useContext, useState} from 'react'
import SearchForm from './SearchForm';
import HealthContext from '../healthContext';

const Users = () => {
  const { getUsersAfterSearch, users, errs } = useContext(HealthContext);

  console.log('errs---->>', errs)
  return (
      <div>
      <h1>Users's Page</h1>
      <SearchForm getUsersAfterSearch={getUsersAfterSearch} />
      {users.firstName}
      {errs[0]}
      
    </div>
  )
}

export default Users