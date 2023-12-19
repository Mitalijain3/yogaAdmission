import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChangeBatch.css';

const ChangeBatch = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        selectedBatch: '6 - 7 AM',
      });
  const [submitted, setSubmitted] = useState(false);
  const [response,setResponse] = useState("You recently enrolled or have change the batch. Atleast, wait for a month to change it back again");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const respone = await axios.post('http://localhost:5000/api/changeBatch', formData);
        console.log(respone);
        setSubmitted(true);
        setResponse("Succesfully updated the batch");
    } catch (error) {
      navigate('/error');
      console.error('Error submitting form:', error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="change-batch-container">
      <h1>Change Batch</h1>
      <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
      
      <label>Select Batch:</label>
      <select name="selectedBatch" value={formData.selectedBatch} onChange={handleChange}>
        <option value="6 - 7 AM">6 - 7 AM</option>
        <option value="7 - 8 AM">7 - 8 AM</option>
        <option value="8 - 9 AM">8 - 9 AM</option>
        <option value="5 - 6 PM">5 - 6 PM</option>
      </select>

        <button type="submit">Change Batch</button>
      </form>

      {submitted && <p>{response}</p>}
    </div>
  );
};

export default ChangeBatch;
