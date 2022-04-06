import { React, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import HealthContext from '../healthContext';
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Alert from "react-bootstrap/Alert";
// import "./LoginForm.css";


/** LoginForm
 * 
 * Props:
 *  - login()
 * 
 * State:
 *  -formData
 *  -formError
 *  
 *  Routes -> LoginForm
 */

const LoginForm = () => {

  const initialState = {username:"", password:""};
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(null);
  const { login } = useContext(HealthContext);
  const history = useHistory();

//handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  };
  
  // handle submit when the form submits
  const handleSubmit = e => {
    try { 
      e.preventDefault();
      login(formData);
      setFormData(initialState);
      history.push('/');
    } catch (e) {
      setFormError(e)
    }
  }

  return (
    <div>
      <h3>Log In</h3>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={formData.username}
          placeholder='username'
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
          placeholder='password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm