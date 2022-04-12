import React, {useContext } from 'react'
import './Homepage.css'
import HealthContext from '../healthContext';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import doctors from '../assets/doctors.png'
// import appointments from '../assets/appointments.png'
import calendar from '../assets/calendar.jpeg'
import users from '../assets/users.jpeg'
import Image from 'react-bootstrap/Image'


const HomePage = () => {
  const { currentUser} = useContext(HealthContext);
  if (currentUser) {
    return (
      <div className="Homepage">
        <Container className="Homepage-container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <Row>
            <Col><h1>Welcome back, {currentUser.firstName}!</h1></Col>  
          </Row>
        </Container>
          <Stack direction="horizontal" gap={5} className="justify-content-center">
              <Link to="/Doctors" className="a-homepage" >
                <Image src={doctors} className='image'></Image>
                <h6 className="mainTiles-homepage" id='doc'>Doctors</h6>
              </Link>
              
              <Link to="/appointments" className="a-homepage">
                <Image src={calendar} className='image'></Image>
                <h6 className="mainTiles-homepage">Appointments</h6>
              </Link>
              <Link to="/users" className="a-homepage">
                <Image src={users} className='image'></Image>
                <h6 className=" mainTiles-homepage">Users</h6>
              </Link>
          </Stack>
      </div>
    );
  } else {
    return (
      <div className="Homepage">
        <h1><Badge bg="secondary" className="Homepage-container">Welcome to Sodlcs Care!</Badge></h1>
        <Link className="loginbtn-homepage" to="/login"> Log In </Link>

      </div>
    )
  }
}

export default HomePage;
