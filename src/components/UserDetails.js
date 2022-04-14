import { useEffect, useState, userContext } from "react";
import HealthcareApi from "../api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserProfileForm from "./UserProfileForm";


    
const UserDetails = () => {
  const [user, setUser] = useState(null);
  // const { user, setUser } = userContext(HealthcareApi);
  const [clicked, setClicked] = useState(false);
  const { username } = useParams();
  // const { firstName, lastName, email, isAdmin } = user;


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
      console.log('data in edit profile', data)
      console.log('res in edit profile', res)
      setUser(res);
    } catch (e) {
     console.log('err in get user details', e)
    }
  }


  const handleUpdateClicke = () => setClicked(true);
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
        <button onClick={handleUpdateClicke}>Update</button>
        <button>Delete</button>
        <Link to={`/users/`}><button>Users</button></Link>
      </div>
      }
    </div>
  );
}

export default UserDetails;