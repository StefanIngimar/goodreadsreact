import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useUser } from './UserContext';
import './Register.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();

  const validateEmail = (email) =>{
    return email.includes('@');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!validateEmail(email)){
      alert('Please enter a valid email address.');
      return;
    }
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Registration successful:', data);

        localStorage.setItem('user', JSON.stringify({
          username: data.username, 
          token: data.token,
          userId: data.userId
        }));
        user({
          username: data.username,
          token: data.token,
          userId: data.userId
        });
        navigate('/timeline');
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
    }
};

  return (
    <div>
    <div className='registerform'>
    <div style={{ backgroundColor: 'beige', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
        />
        <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <button className='registerbtn' type="submit">Register</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Registration;