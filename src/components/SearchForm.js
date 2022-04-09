import React, { useState, useContext } from 'react';
import HealthContext from '../healthContext';

const SearchForm = ({ func }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const { docfunc } = useContext(HealthContext);
  const handleChange = e => {
    const { name, value } = e.target;
    setSearchTerm(value)
  };

  const handleSubmit = e => {
    e.preventDefault();
    func(searchTerm);
    setSearchTerm('');
  };

  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchTerm"
          placeholder="Enter Search Term"
          value={searchTerm}
          onChange={handleChange}
          id="searchTerm"
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchForm;