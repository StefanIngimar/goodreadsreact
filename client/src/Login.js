import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import './Login.css';
//testing user

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();
  const goToRegister=()=>{
    navigate('/Register');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);
      localStorage.setItem('user', JSON.stringify({username, token: data.token}));
      setUser({ username, token: data.token });
      navigate('/timeline');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <div className='goodreadsheading'>
      <h1>
      <span>Good</span><span>reads</span>
      </h1>
    </div>
    <div className="login-form"> {/* Use the login-form class here */}
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <button className='loginbtn' type="submit">Login</button>
        <button className='noaccount' onClick={goToRegister}>Register</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
