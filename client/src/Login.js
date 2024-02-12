import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowError(false);
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Incorrect username or password');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      localStorage.setItem('user', JSON.stringify({
        username: data.username, 
        token: data.token,
        userId: data.userId
      }));
      setUser({
        username: data.username,
        token: data.token,
        userId: data.userId
      });
      navigate('/timeline');
    } catch (error) {
      alert('Login failed. Invalid username or password')
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className='loginbtn' type="submit">Login</button>
        <button type="button" className='noaccount' onClick={() => navigate('/Register')}>Register</button>
      </form>
    </div>
  );
}

export default Login;
