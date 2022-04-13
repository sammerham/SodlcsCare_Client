import React from 'react'
import { Link } from 'react-router-dom';

    // {
    //     "username": "new4",
    //     "firstName": "first4",
    //     "lastName": "last4",
    //     "email": "new4@email.com",
    //     "isAdmin": false
    // }
    
const UserCard = ({ user }) => {
  const { username, firstName, lastName, email, isAdmin } = user;
  return (
    <Link to={`/users/${username}`}>
      <li>
        <b>Username:</b> {username}
        <br />
        <b>Name:</b> {firstName} {lastName}
        <br />
        <b>Email:</b> {email}
        <br />
        <b>Admin:</b> {isAdmin?"Yes":'No'}
        <br />
        <br />
      </li>
    </Link>
  )
}

export default UserCard