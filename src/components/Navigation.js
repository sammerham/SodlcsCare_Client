import React, {useContext } from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import HealthContext from '../healthContext';
import "./Navigation.css";


/** Navigation
 * 
 * Props: 
 *  none
 * 
 * State: 
 *  - none
 * 
 * App -> Navigation
 */

const Navigation = () => {
  const {currentUser, admin} = useContext(HealthContext);
  console.log("Navigation currentUser", currentUser)
  
  //returns navigation links depending on whether the currentUser state is populated
  const getNavLinks = currentUser => {
    if (currentUser === null || currentUser === undefined) {
      return (
        <>
          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/login">
              Login
            </NavLink>
          </Nav.Item>
        </>
      );
    } else if (admin) {
      return (
        <>
          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/appointments">
              Appointments
            </NavLink>
          </Nav.Item>

          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/doctors">
              Doctors
            </NavLink>
          </Nav.Item>

          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/users">
              Users
              </NavLink>
          </Nav.Item>

          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/logout">
              Logout
              </NavLink>
          </Nav.Item>
        </>
      )
    } else {
      return (
        <>
          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/appointments">
              Appointments
            </NavLink>
          </Nav.Item>

          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/doctors">
              Doctors
            </NavLink>
          </Nav.Item>

          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/logout">
              Logout
              </NavLink>
          </Nav.Item>
        </>
      )
    }
  };
  
  return (
    <Nav as="ul" variant="tabs" className="Navigation Nav justify-content-center">
      <Nav.Item as="li">
        <NavLink className="nav-link" exact to="/">
          Home
          </NavLink>
      </Nav.Item>
      {getNavLinks(currentUser)}
    </Nav>
  )
}

export default Navigation