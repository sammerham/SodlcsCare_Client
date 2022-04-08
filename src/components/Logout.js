import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import HealthContext from '../healthContext';

/** Logout
* 
* Props:
*  - logout()
* 
* State: 
*  -none
*/


const Logout = () => {
  const { logout } = useContext(HealthContext);
  const history = useHistory();

  useEffect(() => {
    logout();
    history.push("/");
  });

  return (
    <div className="Logout">
      <p>Logging out...</p>
    </div>
  );
}

export default Logout