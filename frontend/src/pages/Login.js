import React, { useState } from 'react';
import Form from '../components/Form';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { Cursor } from 'mongoose';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', formData);
      console.log('Login response:', response.data);
      // Redirect to dashboard or perform any other action upon successful login
      localStorage.setItem('userId', response.data.user._id);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <Form
        onSubmit={handleSubmit}
        fields={[
          { name: 'email', type: 'email', placeholder: 'Email' },
          { name: 'password', type: 'password', placeholder: 'Password' }
        ]}
        submitButtonText="Login"
      />
      <h4><a href='/register' style = {{cursor:'pointer', textDecoration: 'underline', color:'blue'}}>Register here</a>, if you don't have an account</h4>
    </div>
  );
}

export default Login;
