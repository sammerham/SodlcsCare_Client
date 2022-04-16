import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Doctors from '../doctor/Doctors';
import HomePage from '../HomePage';
import Logout from '../Logout';
import DoctorDetails from '../doctor/DoctorDetails';
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

const PrivateUserRoutes = () => {
  console.log("PrivateRoutes")

  return (

    <Switch> 
      <Route exact path="/"> <HomePage /></Route>
      <Route exact path="/doctors"> <Doctors/></Route>
      <Route exact path="/appointments"> <Appointments/></Route>
      <Route exact path="/appointments/:id"> <ApptDetails/></Route>
      <Route exact path="/appointments/appt/add"> <ApptAddForm/></Route>
      <Route exact path="/logout"> <Logout /> </Route>
      <Route exact path="/doctors/:id"> <DoctorDetails /></Route>


      <Redirect to="/" />

    </Switch>

  )
}

export default PrivateUserRoutes;