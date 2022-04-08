import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from './HomePage';
import LoginForm from "./LoginForm";

/** Routes
 * 
 * Props: 
 *  - login ()
 *  - currentUser {username, firstName, lastName, email,...}
 * 
 * State
 *  - none
 * 
 * App -> PublicRoutes -> {
 *    Homepage, 
 *    LoginForm,
 *  }
 */

const PublicRoutes = () => {
  return (

    <Switch> 
      <Route exact path="/">  <HomePage /> </Route>

      <Route exact path="/login"> <LoginForm /> </Route>

      <Redirect to="/login" />

    </Switch>

  )
}

export default PublicRoutes;