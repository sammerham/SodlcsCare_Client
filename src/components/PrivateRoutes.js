import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from './HomePage';
import Logout from './Logout';

/** Private Routes
 * 
 * Props: 
 *  - none
 * 
 * State:
 *  - none
 * 
 * App -> PrivateRoutes -> {
 *    Homepage, 
 *    DoctorsList, 
 *    Add Doc Form
 *    Add Appt Form
 *    Add user Form
 *    Edit Appt Form
 *    Edit Doc Form
 *    Edit User form
 *    UsersList,
 *    AppointmentsList,
 *    Logout 
 *    Form 
 *  }
 */

const PrivateRoutes = () => {

  console.log("PrivateRoutes")

  return (

    <Switch> 
      <Route exact path="/">  <HomePage /> </Route>

      <Route exact path="/logout"> <Logout /> </Route>

      <Redirect to="/" />

    </Switch>

  )
}

export default PrivateRoutes;