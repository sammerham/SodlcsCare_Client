import { useState, useEffect } from 'react';
import HealthcareApi from './api';
import jwt_decode from "jwt-decode";
import HealthContext from './healthContext';
import { BrowserRouter } from "react-router-dom";
////*******Routes / Navigation */
import Navigation from './components/Navigation';
import PrivateRoutes from './components/PrivateRoutes';
import PublicRoutes from './components/PublicRoutes';
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
  const [user, setUser] = useState(null);
  const [hasLocalToken, setHasLocalToken] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  // console.log('token in local storage ---->>', localStorage.getItem('item'))
  // console.log("App-Start hasLocalToken + currentUser + isLoadingUser ", hasLocalToken, currentUser, isLoadingUser);

  /** set current user and update isLoadingUser if there is a local token */
  useEffect(function changeUserFromToken() {
    let localToken = localStorage.getItem("item");
    // console.log("App changeUserFromToken localToken", localToken);

    if (localToken) {
      setHasLocalToken(true);
      HealthcareApi.token = localToken;
    }

    const userAPICall = async () => {
      try {

        // console.log("App userAPICall HealthcareApi.token", HealthcareApi.token);

        const { username } = jwt_decode(HealthcareApi.token);
        setIsLoadingUser(true);
        const user = await HealthcareApi.getUserByUsername(username);
        setCurrentUser(user);
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


  // Signup
/** Gets auth token from backend on login, sets it on 
* localStorage & updates hasLocalToken */
  
  const signup= async (formData) => {
    const tokenRes = await HealthcareApi.register(formData);
    console.log('tokenres in rgister in app', tokenRes)
    localStorage.setItem("item", tokenRes);
    setHasLocalToken(true)
  };
  
  
  // login
  /** Gets auth token from backend on login, sets it on
   * localStorage and updates hasLocalToken */
  const login = async (loginData) => {
    const tokenRes = await HealthcareApi.login(loginData);
    console.log('tokenres in login in app --->>', tokenRes)
    localStorage.setItem("item", tokenRes);
    setHasLocalToken(true);
  };

  /** Clears local storage and logs user out */
  const logout = async () => {
    localStorage.clear();
    setCurrentUser(null);
    HealthcareApi.token = '';
    setHasLocalToken(false);
  }

    // console.log("App pre-return localStorage token + isLoadingUser",
    //   localStorage.getItem("item"),
    //   isLoadingUser);

  return (
    <div className="App">
      <HealthContext.Provider value={{
        login,
        logout,
        currentUser,
        user,
        setUser
      }}> 
        <BrowserRouter>
          <Navigation />
          {currentUser !== null
            ? <PrivateRoutes />
            : <PublicRoutes />
          }
        </BrowserRouter>
      </HealthContext.Provider>
     </div>
  );
}

export default App;
