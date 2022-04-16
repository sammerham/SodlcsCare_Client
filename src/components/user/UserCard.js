import React from 'react'
import { Link } from 'react-router-dom';

    
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