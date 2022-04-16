import React, {useContext } from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import HealthContext from '../../healthContext';
import NavigationUser from "./NavigationUser";
import NavigationAdmin from "./NavigationAdmin";
// import "./Navigation.css";


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



const NavigationCopy = () => {
  const {admin} = useContext(HealthContext);
  return (
    <>
      {admin ? <NavigationAdmin/> : <NavigationUser />}
    </>
  )
}

export default NavigationCopy;