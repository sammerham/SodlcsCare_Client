import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



import './SearchForm.css'

const SearchForm = ({ setClicked,searchFunc, goBack }) => {
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
  };

  return (
    
    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
              <Form.Label className="required">First Name</Form.Label>
              <Form.Control type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
        </Form.Group>
        <Form.Group controlId="lastName">
              <Form.Label className="required">First Name</Form.Label>
              <Form.Control type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
        </Form.Group>
        <br />
          <Button
            variant="primary"
            type="submit">
            Search
        </Button>
        &nbsp;&nbsp;
        <Button variant="dark" onClick={() => goBack()}>Go Back!</Button>
        <br />
      </Form>
    </div>
  )
}

export default SearchForm;