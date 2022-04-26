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
        <div className="UserDetails">
          <h3 className="mb-4 mt-5">{user.firstName}'s page!</h3>
          <div className="mb-4">
            <span className="d-block"><b >Username:</b> {username} </span>
            <span className="d-block"><b>Name:</b> {user.firstName} {user.lastName} </span>
            <span className="d-block"><b>Email:</b> {user.email} </span>
            <span className="d-block"><b>Admin:</b> {user.isAdmin ? "Yes" : 'No'} </span>
          </div>
          <div>  
            <Button variant="warning" onClick={handleUpdateClick}>Update</Button> 
            &nbsp;&nbsp;
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
            &nbsp;&nbsp;
            <Link to={`/users/`}><Button variant="dark">Go Back!</Button></Link>
          </div>
      </div>
      }
    </div>
  );
}

export default UserDetails;