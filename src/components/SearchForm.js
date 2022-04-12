import React, { useState } from 'react';


import './SearchForm.css'

const SearchForm = ({ setClicked,searchFunc, setAllButtonClicked }) => {
  const initialData = {
    firstName: '',
    lastName: '',
    date:'',
  };

  const [formData, setFormData] = useState(initialData);


// fn to handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

// fn to hadleSubmit
  const handleSubmit = e => {
    e.preventDefault();
    searchFunc(formData);
    setFormData(initialData);
    setClicked(false);
    setAllButtonClicked(true)
  };

  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="required" > First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          id="firstName"        
        />
        <br />
        <label htmlFor="lastName" className="required"> Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          id="lastName"
        />
        <br />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchForm;