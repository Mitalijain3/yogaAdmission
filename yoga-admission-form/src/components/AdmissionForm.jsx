import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import Header from './Header';

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    selectedBatch: '6 - 7 AM',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admission', formData);
      console.log(response);
      const isSuccessfull = response.data.valid;
      console.log(isSuccessfull);
      console.log(response.data);
      navigate('/payment');
    } catch (error) {
      navigate('/error');
      if (error.response) {
        console.error('Server responded with error status:', error.response.status);
        console.error('Error data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='body'>
    <Header/>
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required/>

      <label>Age:</label>
      <input type="text" name="age" value={formData.age} onChange={handleChange} required/>

      <label>Select Batch:</label>
      <select name="selectedBatch" value={formData.selectedBatch} onChange={handleChange}>
        <option value="6 - 7 AM">6 - 7 AM</option>
        <option value="7 - 8 AM">7 - 8 AM</option>
        <option value="8 - 9 AM">8 - 9 AM</option>
        <option value="5 - 6 PM">5 - 6 PM</option>
      </select>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default AdmissionForm;
