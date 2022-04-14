import React, { useEffect, useState} from 'react'
import SearchForm from './SearchForm';
import HealthcareApi from '../api';
import { v4 as uuidv4 } from "uuid";
import UserCard from './UserCard';




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

  console.log('users --->>', users)


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
 
  // addUser
    // {
  //         username: "u-new",
  //         firstName: "First-new",
  //         lastName: "Last-newL",
  //         password: "password-new",
  //         email: "new@email.com",
  //         isAdmin: false,
  //       }
  return (
    <div>
        <h1>Users</h1>
       
      {clicked ? <SearchForm
        setClicked={setClicked}
        searchFunc={getUsersAfterSearch}
        setAllButtonClicked={setAllButtonClicked}
      />
        :
        <>
          {usersErrs.length !== 0 && usersErrs.map(err => (
            <div key={uuidv4()}>
              {err}
            </div>
          ))}
        
          <ul style={{listStyle:'none'}}>
            {users.length !== 0 && users?.map(u => (
              <UserCard user={u} key={u.username}/>
            ))}
          </ul>
            {users.length !== 1 && <button>Add a user</button>}
        </>
      }
       {!clicked && <button onClick={handleSearchClicked}>Search for a User</button>}
      <br />
      {allButtonClikced && <button onClick={() => getUsers()}>See All Users</button>}
      
    </div>
  )
}

export default Users