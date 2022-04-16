import { useEffect, useState } from "react";
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

// deleteUser(username)
  
//updateUser(username, data)
  if (user === null) {
    return (<div className="UserDetails"><h1>Loading...</h1></div>);
  }
  console.log('clicked in user details --->>', clicked)

  return (

    <div>
      {clicked ?
        <UserProfileForm user={user} updateProfile={updateProfile} />
        :
      <div className="UserDetails">
        <b>Username:</b> {username}
        <br />
        <b>Name:</b> {user.firstName} {user.lastName}
        <br />
        <b>Email:</b> {user.email}
        <br />
        <b>Admin:</b> {user.isAdmin?"Yes":'No'}
        <br />
        <br />
        {/* <Link to={`/users/${username}/update`}><button>Update</button></Link> */}
          <Button variant="warning" onClick={handleUpdateClick}>Update</Button> 
          &nbsp;&nbsp;
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
          &nbsp;&nbsp;
        <Link to={`/users/`}><Button variant="dark">Go Back!</Button></Link>
      </div>
      }
    </div>
  );
}

export default UserDetails;