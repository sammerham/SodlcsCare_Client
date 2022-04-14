import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Appointments from './Appointments';
import Doctors from './Doctors';
import HomePage from './HomePage';
import Logout from './Logout';
import Users from './Users';
import UserDetails from './UserDetails';
import UserProfileForm from './UserProfileForm';

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
      <Route exact path="/"> <HomePage /></Route>
      <Route exact path="/doctors"> <Doctors/></Route>
      <Route exact path="/users"> <Users/></Route>
      <Route exact path="/appointments"> <Appointments/></Route>
      <Route exact path="/logout"> <Logout /> </Route>
      <Route exact path="/users/:username"> <UserDetails /></Route>
      <Route exact path="/users/:username/update"> <UserProfileForm /></Route>

      <Redirect to="/" />

    </Switch>

  )
}

export default PrivateRoutes;