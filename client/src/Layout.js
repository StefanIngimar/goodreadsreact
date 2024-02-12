import React from 'react';
import BookSearch from './BookSearch';
import './Layout.css'
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate('/MyProfile');
  };
  return (
    <div className="layout-container">
      <div className="header">
        <div className='book-search-container'>
        <BookSearch />
        </div>
        <div className="user-controls">
          <button onClick={goToProfile} className="profile-btn">Profile</button>
          <div className="settings-dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Settings
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Edit Profile</a></li>
              <li><a className="dropdown-item" href="#">Dark mode</a></li>
              <li><a className="dropdown-item" href="#">Log out</a></li>
            </ul>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
