import React, { useEffect, useState} from 'react'
import SearchForm from '../SearchForm';
import HealthcareApi from '../../api';
import { v4 as uuidv4 } from "uuid";
import UserCard from './UserCard';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import userscomp from '../../assets/userscomp.jpeg'
import Image from 'react-bootstrap/Image'
import Pagination from '../Pagination';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [usersErrs, setUsersErrs] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const lastItemIdx = currPage * itemsPerPage;
  const firstItemIdx = lastItemIdx - itemsPerPage;
  const currUsers = users.slice(firstItemIdx, lastItemIdx);

  const paginate = num => setCurrPage(num);




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
          <h3 className='mt-5 mb-4'>Search for a user!</h3>
          <SearchForm
            setClicked={setSearchClicked}
            searchFunc={getUsersAfterSearch}
            goBack={ getUsers}  
          />
          </>
        :
        <>    
          <Image src={userscomp} className='image mb-4'></Image> 
          {usersErrs.length !== 0 && usersErrs.map(err => (
            <div key={uuidv4()}>
              {err}
            </div>
          ))}
        
          <ul style={{listStyle:'none'}}>
            {<Link to={`/users/user/add`}><Button variant="success" className ="mb-4" >Add User</Button></Link>}
            &nbsp;&nbsp;
            {!searchClicked && <Button variant="warning" className ="mb-4" onClick={handleSearchClicked}>Find User</Button>} 

            {users.length !== 0 && currUsers?.map(u => (
              <UserCard user={u} key={u.username}/>
            ))}
            <Pagination
              
              paginate={paginate}
              itemsPerPage={itemsPerPage}
              totalItems={users.length}
            />
          </ul>
        </>
      }
      
    </div>
  )
}

export default Users