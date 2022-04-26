import React from 'react'
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import './UserCard.css'

    
const UserCard = ({ user }) => {
  const { username, firstName, lastName, email, isAdmin } = user;
  return (
    <Link to={`/users/${username}`} >
      <Card className="UserCard">
        <Card.Body>
          <b>Username:</b> {username}
          <br />
          <b>Name:</b> {firstName} {lastName}
          <br />
          <b>Email:</b> {email}
          <br />
          <b>Admin:</b> {isAdmin?"Yes":'No'}
          <br />
          <br />
          </Card.Body>
      </Card>
    </Link>
  )
}

export default UserCard