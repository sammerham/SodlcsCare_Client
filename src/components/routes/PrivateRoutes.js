import React, { useContext } from 'react';
import { Switch } from "react-router-dom";

import PrivateUserRoutes from './PrivateUserRoutes';
import PrivateAdminRoutes from './PrivateAdminRoutes';
import HealthContext from '../../healthContext';


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
  const { admin } = useContext(HealthContext);
  return (
    <Switch>
      {admin? <PrivateAdminRoutes/> : <PrivateUserRoutes/>}
    </Switch>

  )
}

export default PrivateRoutes;