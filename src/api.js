import axios from "axios";
const BASE_URL = 'http://localhost:3001';


/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class HealthcareApi {
  // the token for interactive with the API will be stored here.
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = (method === "get") ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
//!*********** AUTH ******************************************************
  // login - post request, return token */
  static async login(data) {
    const response = await this.request("auth/login", data, "post");
    return response.token;
  }
  
 /** Register - post request, return token */

  static async register(data) {
    const response = await this.request("auth/register", data, "post");
    return response.token;
  }
//!******************* USERS *******************************************
   // get users - get request return [{},{},{}]
  static async getUsers() { 
    const response = await this.request("users");
    return response.users;
  }

  // get user - get request returns single user 
  static async getUser(username) { 
    const response = await this.request(`users/${username}`);
    return response.user;
  }

  // update a user patch request, return user */
  static async updateUser(username, data) {
    const response = await this.request(`users/${username}`, data, "patch");
    return response.user;
  }
  // delete user - delete request, return deleted username
   static async deleteUser(username) {
     const response = await this.request(`users/${username}`,{}, "delete");
     console.log('response in deleye yser api----->>', response)
    return response;
  }
//!******************* DOCTORS *******************************************
  // get doctors - get request return [{},{},{}]
  static async getDoctors() { 
    const response = await this.request("doctors");
    return response.doctors;
  }

 // get doctor - get request return {}
  static async getDoctor( data ) { 
    const response = await this.request(`doctors/name`, data, 'post' );
    return response.doctor;
  }

  // get doctor's appts - get request appts [{}, {}, ...]
  static async getDoctorAppts( data ) { 
    const response = await this.request(`doctors/name/appts`, data, 'post' );
    return response.appts;
  }

  // get doctor's appts - get request appts [{}, {}, ...]
  static async getDoctorApptsByDate( data ) { 
    const response = await this.request(`doctors/name/appts/date`, data, 'post' );
    return response.appts;
  }

   // get doctor by id - get request return {}
  static async getDoctorById(id) { 
    const response = await this.request(`doctors/${id}`);
    return response.doctor;
  }

  // get doc appts by doc id - get request return [{}, {}, ....]
  static async getDoctorApptsById(id) { 
    const response = await this.request(`doctors/${id}/appts`);
    return response.appts;
  }

  // get doc appts by doc id for certian date- get request return [{}, {}, ....]
  static async getDoctorApptsByIdDate(id, data) { 
    const response = await this.request(`doctors/${id}/appts/date`, data, "post");
    return response.appts;
  }

  // post doc - adds a doctor return doctor {}
  static async addDocotor(data) { 
    const response = await this.request(`doctors/`, data, "post");
    return response.doctor;
  }

  // delete doc - deletes a doc return Docotor deleted {}
  static async removeDocotor(id) { 
    const response = await this.request(`doctors/${id}`,{}, "delete");
    return response.message;
  }
  // patch doc - updates a doctor info (fName, lName, email)
  static async updateDocotor(id, data) { 
    const response = await this.request(`doctors/${id}`,data, "patch");
    return response.doctor;
  }
  //!******************* Appointments *******************************************
   // get appointments - get request return [{},{},{}]
  static async getAppts() { 
    const response = await this.request(`appts`);
    return response.appointments;
  }
  getApptsByName
  
  // get appts by patient's name - post request return [{}, {}, ...]
  static async getApptByName(data) { 
    const response = await this.request(`appts/name`, data, "post");
    return response.appointments;
  }
  
   // get appts by id - get request return {}
  static async getApptById(id) { 
    const response = await this.request(`appts/${id}`);
    return response.appointment;
  }


  // post appt - add appt and returns {}
  static async addAppt(data) { 
    const response = await this.request(`appts/`,data, "post");
    return response.appointment;
  }

  // delete appt - deletes an appt return Appt deleted 
  static async removeAppt(id) { 
    const response = await this.request(`appts/${id}`,{}, "delete");
    return response.message;
  }

  // patch appt - updates appt info return appt
  static async updateAppt(id, data) { 
    const response = await this.request(`appts/${id}`,data, "patch");
    return response.appointment;
  }
}

export default HealthcareApi;