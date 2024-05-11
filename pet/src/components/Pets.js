import React, { useState } from 'react';
import axios from 'axios';

const Pets = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: 0,
    type: '',
    location: '',
  });

  const [error, setError] = useState(null); // Hata durumunu saklamak için bir state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/dog/add', formData);
      console.log('Dog signed up successfully:', response.data);
      // Başarılı olduğunda herhangi bir hata olmadığını varsayarak formu sıfırlayın
      setFormData({
        email: '',
        name: '',
        age: 0,
        type: '',
        location: '',
      });
    } catch (error) {
      console.error('Error signing up dog:', error);
      // Axios'tan gelen hatayı daha spesifik bir hata mesajına dönüştürün
      setError('An error occurred while signing up the dog. Please try again later.');
    }
  };
  

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata varsa göster */}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required/>
        </label>
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select a type</option>
            <option value="Labrador">Labrador</option>
            <option value="German Shepherd">German Shepherd</option>
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="Bulldog">Bulldog</option>
            <option value="Poodle">Poodle</option>
            <option value="Beagle">Beagle</option>
            <option value="Boxer">Boxer</option>
            <option value="Yorkshire Terrier">Yorkshire Terrier</option>
            <option value="Dachshund">Dachshund</option>
            <option value="Rottweiler">Rottweiler</option>
          </select>
        </label>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label>
        <button type="submit">Create Dog</button>
      </form>
    </div>
  );
};

export default Pets;
