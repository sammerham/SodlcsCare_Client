import React, { useEffect, useState } from "react";
import HealthcareApi from '../../api';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserProfileForm from "./UserProfileForm";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";

    
const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [clicked, setClicked] = useState(false);
  const { username } = useParams();
  const history = useHistory();


  // fn to call api and get a single user by username
  const getSingleUserInfo = async (username) => { 
    try {
      const res = await HealthcareApi.getUserByUsername(username);
      setUser(res);
    } catch (e) {
     console.log('err in get user details', e)
    }
  }

  // fn to call api and update user by username
  const updateProfile = async (username, data) => { 
    try {
      const res = await HealthcareApi.updateUser(username, data);
      setUser(res);
    } catch (e) {
     console.log('err in get user details', e)
    }
  }

  const handleDelete = async () => {
    await HealthcareApi.deleteUser(username);
    history.push('/users')
  } 

  const handleUpdateClick = () => setClicked(true);

  
  useEffect(() => {
    getSingleUserInfo(username);
  }, [username])


  
//updateUser(username, data)
  if (user === null) {
    return (<div className="UserDetails"><h1>Loading...</h1></div>);
  }


  return (

    <div>
      
      {clicked ?
        <UserProfileForm user={user} updateProfile={updateProfile} setClicked={setClicked} />
        :
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link" href={`/users/`}>Go Back!</a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <h4 className="card-title mb-4 mt-4">{user.firstName}'s page!</h4>
          <p className="card-text"><b>Username:</b> {username}</p>
          <p className="card-text"><b>Name:</b> {user.firstName} {user.lastName}</p>
          <p className="card-text"><b>Email:</b> {user.email}</p>
          <p className="card-text"><b>Admin:</b> {user.isAdmin ? "Yes" : 'No'}</p>
          <Button variant="warning" onClick={handleUpdateClick}>Update</Button> 
          &nbsp;&nbsp;
          <Button variant="danger" onClick={handleDelete}>Delete</Button>          
        </div>
      </div>
      
      }

    </div>
  );
}

export default UserDetails;