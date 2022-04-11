import React, { useState, useContext } from 'react';
import HealthContext from '../healthContext';


const SearchForm = ({ searchFunc }) => {
  
  const initialData = {
    firstName: '',
    lastName: ''
  };
  const [formData, setFormData] = useState(initialData);
  const { setDisplayResults } = useContext(HealthContext);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    searchFunc(formData);
    setFormData(initialData);
    setDisplayResults(true);
  };

  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName"> First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          id="firstName"
        />
        <label htmlFor="lastName"> Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          id="lastName"
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchForm;