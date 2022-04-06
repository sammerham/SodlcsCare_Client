import { React, useContext } from 'react'
import './Homepage.css'
import HealthContext from '../healthContext';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';


const HomePage = () => {
  const { currentUser } = useContext(HealthContext);
  if (currentUser) {
    return (
      <div className="Homepage">
        <Container className="Homepage-container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <Row>
            <Col><h1>Welcome back, {currentUser.firstName}!</h1></Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="Homepage">
        <h1><Badge bg="secondary" className="Homepage-container">Welcome to Sodlcs Care!</Badge></h1>
        <Link className="btn btn-primary" to="/login"> Log In </Link>

      </div>
    )
  }
}

export default HomePage;
