import { useState, useEffect } from 'react';
import HealthcareApi from './api';
import jwt_decode from "jwt-decode";
import HealthContext from './healthContext';
import { BrowserRouter } from "react-router-dom";

////*******Routes / Navigation */
// import PrivateRoutes from "./PrivateRoutes"
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
  const [hasLocalToken, setHasLocalToken] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [searchClicked, setSearchClicked] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appts, setAppts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchErrs, setSearchErrs] = useState([]);
  const [displayResults, setDisplayResults] = useState(false)
  
 
  console.log("App-Start hasLocalToken + currentUser + isLoadingUser ", hasLocalToken, currentUser, isLoadingUser);
  console.log('App users ---->>', users)
  
  /** set current user and update isLoadingUser if there is a local token */
  useEffect(function changeUserFromToken() {
    let localToken = localStorage.getItem("item");
    console.log("App changeUserFromToken localToken", localToken);

    if (localToken) {
      setHasLocalToken(true);
      HealthcareApi.token = localToken;
    }

    const userAPICall = async () => {
      try {

        console.log("App userAPICall HealthcareApi.token", HealthcareApi.token);

        let { username } = jwt_decode(HealthcareApi.token);
        setIsLoadingUser(true);
        let user = await HealthcareApi.getUserByUsername(username);
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


  // fn to call api and  get user by a name

  async function getUsersAfterSearch(formData) { 
    try {
      let user = await HealthcareApi.getUserByName(formData);
      setUsers(users => [user]);
      setSearchClicked(false);
      setSearchErrs([]);
    } catch (e) {
      setSearchErrs(e);
      setUsers([])
    }
  };



// fn to call api and get all users
  async function getUsers(formData) { 
    try {
      let users = await HealthcareApi.getUsers();
      setUsers(oldUsers => users);
      setSearchClicked(false);
      setSearchErrs([]);
    } catch (e) {
     console.log('err in get all users', e)
    }
  };


  const resetUsersInfo = () => {
    setUsers([]);
    setSearchErrs([]);
    setSearchClicked(false);
  };

  const resetDocsInfo = () => {
    setDoctors([]);
    setSearchErrs([]);
    setSearchClicked(false);
  };

  const resetApptsInfo = () => {
    setAppts([]);
    setSearchErrs([]);
    setSearchClicked(false);
  };

    // fn to call api and  get doctor by a name

  async function getDoctorsAfterSearch(formData) { 
    try {
      let doctor = await HealthcareApi.getDoctor(formData);
      setDoctors(doctors => [doctor]);
      setSearchClicked(false);
      setSearchErrs([]);
    } catch (e) {
      setSearchErrs(e);
      setDoctors([])
    }
  };
console.log('doctprs after doc search', doctors)
// fn to call api and get all doctors
  async function getAllDoctors() { 
    try {
      let doctors = await HealthcareApi.getDoctors();
      setSearchErrs([]);
      setDoctors(oldDoctors => doctors);
      setSearchClicked(false);
    } catch (e) {
     console.log('err in get all doctors', e)
    }
  };



    // fn to call api and  get doctor by a name

  async function getApptsAfterSearch(formData) { 
    try {
      let appts = await HealthcareApi.getApptByName(formData);
      setAppts(oldAppts => appts);
      setSearchErrs([]);
      setSearchClicked(false);
    } catch (e) {
      setSearchErrs(e);
      setAppts([])
    }
  };

// fn to call api and get all appointments
  async function getAllAppts() { 
    try {
      let appts = await HealthcareApi.getAppts();
      setSearchErrs([]);
      setAppts(oldAppts => appts);
      setSearchClicked(false);
    } catch (e) {
     console.log('err in get all appts', e)
    }
  };


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
    console.log('tokenres in login in app', tokenRes)
    setHasLocalToken(true);
    localStorage.setItem("item", tokenRes);
  };

  /** Clears local storage and logs user out */
  const logout = async () => {
    localStorage.clear();
    setUsers([]);
    setDoctors([]);
    setAppts([]);
    setSearchErrs([]);
    setCurrentUser(null);
    setSearchClicked(false);
    setDisplayResults(false);
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
        getUsersAfterSearch,
        getUsers,
        users,
        doctors,
        appts,
        getAllDoctors,
        getDoctorsAfterSearch,
        getAllAppts,
        getApptsAfterSearch,
        searchErrs,
        searchClicked,
        setSearchClicked,
        displayResults,
        setDisplayResults,
        resetUsersInfo,
        resetDocsInfo,
        resetApptsInfo
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
