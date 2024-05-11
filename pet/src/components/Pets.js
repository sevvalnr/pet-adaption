import React, { useState } from 'react';
import axios from 'axios';

const Pets = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: 0,
    type: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/dog/add', formData);
      alert('Dog created successfully!');
      // You can perform any other actions after successful creation
    } catch (error) {
      console.error('Error creating dog:', error);
      alert('An error occurred while creating the dog.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </label>
      <label>
        Type:
        <input type="text" name="type" value={formData.type} onChange={handleChange} />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>
      <button type="submit">Create Dog</button>
    </form>
  );
};
export default Pets;
