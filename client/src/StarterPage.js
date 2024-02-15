import React from 'react';
import { Link } from 'react-router-dom';
import './StarterPage.css';//test

function StarterPage() {
  return (
    <div>
    <div className="starter-page d-flex flex-column align-items-center">
      <div className="top-bar d-flex justify-content-between align-items-center w-100 px-3">
      <div className='goodreadsheading'>
      
      </div>
        <nav className="navigation d-flex">
          <Link to="/login" className="btn btn-primary mx-2">Login</Link>
          <Link to="/register" className="btn btn-secondary mx-2">Register</Link>
        </nav>
      </div>
      <img src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Books" className="books-img w-100"/>
    </div>
    </div>
  );
}

export default StarterPage;
