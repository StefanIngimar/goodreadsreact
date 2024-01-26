import React from 'react';
import { Link } from 'react-router-dom';
import './StarterPage.css';

function StarterPage() {
  return (
    <div className="starter-page">
      <header className="header">
        <h1>Welcome to Book Lovers Community</h1>
      </header>
      <nav className="navigation">
        <Link to="/login"><button className="btn">Login</button></Link>
        <Link to="/register"><button className="btn">Register</button></Link>
      </nav>
    </div>
  );
}

export default StarterPage;