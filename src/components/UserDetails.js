import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HealthcareApi from "../api";
import { Link } from "react-router-dom";

    
const UserDetails = () => {
  const [user, setUser] = useState(null);
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
  
  useEffect(() => {
    getSingleUserInfo(username);
  }, [username])


  if (user === null) {
    return (<div className="UserDetails"><h1>Loading...</h1></div>);
  }


  return (
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
        <button>Update</button>
        <button>Delete</button>
       <Link to={`/users/`}><button>Users</button></Link>
    </div>
  );
}

export default UserDetails;