import React, { useState, useEffect } from 'react';
import HealthcareApi from './api';
import jwt_decode from "jwt-decode";
import HealthContext from './healthContext';
import { BrowserRouter } from "react-router-dom";
////*******Routes / Navigation */
import Navigation from './components/Navigation';
import PrivateRoutes from './components/routes/PrivateRoutes';
import PublicRoutes from './components/routes/PublicRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/** App
 * 
 * Props:
 *  - none
 * 
 * State:
 *  - currentUser {username, firstName, lastName, email,...}
 *  - hasLocalToken (boolean)
 *  - isLoadingUser (boolean)
 * 
 * App -> { Navigation, PublicRoutes, PrivateRoutes }
 */

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [hasLocalToken, setHasLocalToken] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [docNames, setDocNames] = useState([]);


  useEffect(function changeUserFromToken() {
    let localToken = localStorage.getItem("item");
    console.log("App changeUserFromToken localToken", localToken);

    if (localToken) {
      setHasLocalToken(true);
      HealthcareApi.token = localToken;
    }

    async function userAPICall() {
      try {

        console.log("App userAPICall HealthcareApi.token", HealthcareApi.token);

        let { username } = jwt_decode(HealthcareApi.token);
        setIsLoadingUser(true);
        let user = await HealthcareApi.getUserByUsername(username);
        setCurrentUser(user);
        setAdmin(user.isAdmin);
        //re-render here
        setIsLoadingUser(false);

      } catch (err) {

        console.log("App userAPICall err", err);

        setCurrentUser(null)
        setIsLoadingUser(false);
      }
    };

    if (hasLocalToken) {
      userAPICall();
    }
  }, [hasLocalToken]);


  // login
  /** Gets auth token from backend on login, sets it on
   * localStorage and updates hasLocalToken */
   async function login(formData) {
    let tokenRes = await HealthcareApi.login(formData);
    setHasLocalToken(true);
    localStorage.setItem("item", tokenRes);
  };




  // Signup
/** Gets auth token from backend on login, sets it on 
* localStorage & updates hasLocalToken */
  
  // const signup= async (formData) => {
  //   let tokenRes = await HealthcareApi.register(formData);
  //   localStorage.setItem("item", tokenRes);
  //   setHasLocalToken(true)
  // };
  
  


  /** Clears local storage and logs user out */
  const logout = async () => {
    localStorage.clear();
    setCurrentUser(null);
    setHasLocalToken(false);
  }



  // get doctors full names to use in update and add appt forms
 useEffect(() => {
    async function getDoctorsNames() {
      const res = await HealthcareApi.getDoctors();
      const names = res.map(d => `${d.first_name} ${d.last_name}`)
      setDocNames(docNames => names);
    };
    getDoctorsNames();
 }, []);
  
  
  

    console.log("App pre-return localStorage token + isLoadingUser",
      localStorage.getItem("item"),
      isLoadingUser);
  if (localStorage.getItem("item") && isLoadingUser) {
    return (
      <div className="App"><h1>loading...</h1></div>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <HealthContext.Provider value={{
        login,
        logout,
        currentUser,
        user,
        setUser,
        docNames,
          admin,
        }}> 
          <Navigation />
    

        {currentUser !== null
            ? <PrivateRoutes />
            : <PublicRoutes />
          } 
        </HealthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
