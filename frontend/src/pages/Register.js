// Register.js

import React, { useState } from 'react';
import Form from '../components/Form';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/register', formData); // Corrected URL
      // Redirect to login page or perform any other action upon successful registration
      localStorage.setItem('userId', response.data.user._id);
      console.log("responseeeeee", response.data)
      navigate('/user-profile')
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <Form
        onSubmit={handleSubmit}
        fields={[
          { name: 'name', type: 'text', placeholder: 'Name' },
          { name: 'email', type: 'email', placeholder: 'Email' },
          { name: 'password', type: 'password', placeholder: 'Password' }
        ]}
        submitButtonText="Register"
      />
    </div>
  );
}

export default Register;
