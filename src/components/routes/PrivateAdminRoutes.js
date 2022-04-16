import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from '../HomePage';
import Logout from '../Logout';
import Users from '../user/Users';
import UserDetails from '../user/UserDetails';
import UserAddForm from '../user/UserAddForm';
import Doctors from '../doctor/Doctors';
import DoctorDetails from '../doctor/DoctorDetails';
import DoctorAddForm from '../doctor/DoctorAddForm';
import Appointments from '../appointment/Appointments';
import ApptDetails from '../appointment/ApptDetails';
import ApptAddForm from '../appointment/ApptAddForm';



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

const PrivateAdminRoutes = () => {
  console.log("PrivateRoutes")

  return (

    <Switch> 
      <Route exact path="/"> <HomePage /></Route>
      <Route exact path="/users"> <Users/></Route>
      <Route exact path="/users/:username"> <UserDetails /></Route>
      <Route exact path="/users/user/add"> <UserAddForm /></Route>
      <Route exact path="/doctors"> <Doctors/></Route>
      <Route exact path="/doctors/:id"> <DoctorDetails /></Route>
      <Route exact path="/doctors/doctor/add"> <DoctorAddForm /></Route>
      <Route exact path="/appointments"> <Appointments/></Route>
      <Route exact path="/appointments/:id"> <ApptDetails/></Route>
      <Route exact path="/appointments/appt/add"> <ApptAddForm/></Route>
     
      <Route exact path="/logout"> <Logout /> </Route>

      <Redirect to="/" />

    </Switch>

  )
}

export default PrivateAdminRoutes;