import React, { useEffect, useState} from 'react'
import SearchForm from './SearchForm';
import HealthcareApi from '../api';
import { v4 as uuidv4 } from "uuid";
import UserCard from './UserCard';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import calendar from '../assets/calendar.jpeg'
import userscomp from '../assets/userscomp.jpeg'
import Image from 'react-bootstrap/Image'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [usersErrs, setUsersErrs] = useState([]);

  // handle search click
  const handleSearchClicked = () => {
    setSearchClicked(true);
    setUsers([]);
    setUsersErrs([]);
  }



// fn to call api and get all users
  async function getUsers() { 
    try {
      const users = await HealthcareApi.getUsers();
      setUsers(oldUsers => users);
      setUsersErrs([]);
      setSearchClicked(false);
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
      setSearchClicked(false);
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

      {searchClicked ?
        <>
          <h3>Search for a user!</h3>
          <SearchForm
            setClicked={setSearchClicked}
            searchFunc={getUsersAfterSearch}
            goBack={ getUsers}  
          />
          </>
        :
        <>    
          <Image src={userscomp} className='image'></Image> 
          <br />
          <br />
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
          {users.length !== 1 && <Link to={`/users/user/add`}><Button variant="success" >Add User</Button></Link>}
          &nbsp;&nbsp;
        </>
      }
      {!searchClicked && <Button variant="warning" onClick={handleSearchClicked}>Find User</Button>} 
      &nbsp;&nbsp;
      {users.length === 1 && <Button variant="dark" onClick={() => getUsers()}>Go Back!</Button>}
      
    </div>
  )
}

export default Users