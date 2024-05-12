import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddPetGeneral.css'; // CSS dosyasını ekleyin

const AddDog = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: '',
    type: '',
    location: '',
    description: '',
    images: [], // Resimlerin listesi
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    // Birden fazla dosya eklemek için dosyaları bir diziye ekleyin
    setFormData({ ...formData, images: [...formData.images, e.target.files[0]] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImages = new FormData();
      formDataWithImages.append('email', formData.email);
      formDataWithImages.append('name', formData.name);
      formDataWithImages.append('age', formData.age);
      formDataWithImages.append('type', formData.type);
      formDataWithImages.append('location', formData.location);
      formDataWithImages.append('description', formData.description);

      // Tüm resimleri FormData'ya ekleyin
      formData.images.forEach((image, index) => {
        formDataWithImages.append(`image${index}`, image);
      });

      const response = await axios.post('http://localhost:3000/dog/add', formDataWithImages);
      console.log('Dog signed up successfully:', response.data);

      setFormData({
        email: '',
        name: '',
        age: '',
        type: '',
        location: '',
        description: '',
        images: [],
      });
      setError(null);
    } catch (error) {
      console.error('Error signing up dog:', error);
      setError('An error occurred while signing up the dog. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      {error && <p className="error-message">{error}</p>}
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
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="German Shepherd">Alman Çoban Köpeği</option>
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="Labrador Retriever">Labrador Retriever</option>
            <option value="Bulldog">Bulldog</option>
            <option value="Beagle">Beagle</option>
            <option value="Poodle">Poodle</option>
            <option value="Boxer">Boxer</option>
            <option value="Siberian Husky">Sibirya Huskisi</option>
            <option value="Dachshund">Dachshund</option>
            <option value="Pug">Pug</option>
          </select>
        </label>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label>
        <label>
          Images:
          <input type="file" name="image" onChange={handleImageChange} accept="image/*" multiple />
        </label>
        <button type="submit" className="submit-button">Create Dog</button>
      </form>
    </div>
  );
};


export default AddDog;
