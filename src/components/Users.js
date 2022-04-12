import React, { useEffect, useState} from 'react'
import SearchForm from './SearchForm';
import HealthcareApi from '../api';




const Users = () => {
  const [users, setUsers] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [usersErrs, setUsersErrs] = useState([]);
  const [allButtonClikced, setAllButtonClicked] = useState(false);

  // handle search click
  const handleSearchClicked = () => {
    setClicked(true);
    setUsersErrs([]);
    setUsers([]);
    setAllButtonClicked(true)
  }

// fn to call api and get all users
  async function getUsers() { 
    try {
      const users = await HealthcareApi.getUsers();
      setUsers(oldUsers => users);
      setUsersErrs([]);
      setClicked(false);
      setAllButtonClicked(false)
    } catch (e) {
      setUsersErrs(e);
      setUsers([])
    }
  };


  // fn to call api and  get user by a name

  async function getUsersAfterSearch(formData) { 
    try {
      const user = await HealthcareApi.getUserByName(formData);
      setUsers(oldUsers => [user]);
      setUsersErrs([]);
      setClicked(false);
    } catch (e) {
      setUsersErrs(e);
      setUsers([])
    }
  };

  useEffect(() => {
    // fn to call api and get all users
    getUsers()
  }, []);
 
  return (
    <div>
        <h1>Appointments</h1>
       
      {clicked ? <SearchForm
        setUsers={setUsers}
        setClicked={setClicked}
        setUsersErrs={setUsersErrs}
        searchFunc={getUsersAfterSearch}
        setAllButtonClicked={setAllButtonClicked}
      />
        :
        <>
          {usersErrs.length !== 0 && usersErrs.map(err => (
            <div>
              {err}
            </div>
          ))}
        
          {users.length !== 0 && users?.map(u => (
            <div key={u.username}>
              {u.firstName}
            </div>
          ))}
        </>
      }
       {!clicked && <button onClick={handleSearchClicked}>Search for a User</button>}
      <br />
      {allButtonClikced && <button onClick={()=> getUsers()}>See All Users</button>}
    </div>
  )
}

export default Users