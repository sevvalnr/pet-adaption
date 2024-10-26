  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import '../styles/AddPetGeneral.css'; 
  import { useLocation } from 'react-router-dom';

  const AddBird = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('Id');
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
      email: '',
      name: '',
      age: '',
      type: '',
      location: '',
      description: '',
      images: [], 
      userId: '', 
    });

    useEffect(() => {
      if (userId && userId !== formData.userId) {
        setFormData(prevState => ({ ...prevState, userId }));
      }
    }, [userId, formData.userId]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
      const selectedImages = Array.from(e.target.files);
      setFormData({ ...formData, images: selectedImages });
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
        formDataWithImages.append('userId', formData.userId); 

        formData.images.forEach((image, index) => {
          formDataWithImages.append(`image${index}`, image);
        });

        const response = await axios.post('http://localhost:3000/bird/add', formDataWithImages);
        console.log('Dog signed up successfully:', response.data);

        setFormData({
          email: '',
          name: '',
          age: '',
          type: '',
          location: '',
          description: '',
          images: [],
          userId: '',
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
            
              <option value="Parrot">Parrot</option>
              <option value="Cockatiel">Cockatiel</option>
              <option value="Canary">Canary</option>
              <option value="Dachshund">Dachshund</option>
              <option value="Finch">Finch</option>
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
          <button type="submit" className="submit-button">Create Bird</button>
        </form>
      </div>
    );
  };

  export default AddBird;
