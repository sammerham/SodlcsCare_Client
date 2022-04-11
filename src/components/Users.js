import React, {useContext, useEffect} from 'react'
import SearchForm from './SearchForm';
import HealthContext from '../healthContext';

const Users = () => {

  const {
    getUsers,
    getUsersAfterSearch,
    users,
    searchErrs,
    searchClicked,
    setSearchClicked,
    displayResults,
    setDisplayResults,
  } = useContext(HealthContext);

  
  const handleSearchClicked = () => {
    setDisplayResults(false);
    setSearchClicked(true);
  };
  const handleAllUsersClicked = () => {
    setDisplayResults(true);
    setSearchClicked(false)
    getUsers()
  }
  console.log('display users --->>', displayResults)
  console.log('search Clicked --->>', searchClicked)
  console.log('errs---->>', searchErrs)
  console.log('users in users comp---->>', users)

  return (
      <div>
      <h1>Users</h1>
      <button onClick={handleSearchClicked}>Search for a user</button>
      <button onClick={handleAllUsersClicked}>See all users</button>
      {searchClicked && <SearchForm searchFunc={getUsersAfterSearch} />}

      {searchErrs.length !== 0 && searchErrs.map(err => (
        <div>
          {err}
        </div>
      ))}
      
      {displayResults && users?.map(u => (
          <div>
            {u.firstName}
        </div>
      ))}
      
      
    </div>
  )
}

export default Users