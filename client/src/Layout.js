import React from 'react';
import BookSearch from './BookSearch';
import './Layout.css'
import { useNavigate, Link } from 'react-router-dom';
import {useUser} from './UserContext';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="layout-container">
      <nav className="navbar">
        <Link to="/timeline" className="logo"><span>Good</span><span>reads</span></Link>
        {user &&(
          <div className='book-search-container'>
            <BookSearch />
          </div>
        )}
        {user && (
          <div className="user-controls">
            <div className="settings-dropdown">
            <button className="profile-pic-btn" style={{ backgroundImage: `url(${user.profilePictureUrl})`, backgroundSize: 'cover', borderRadius: '50%', width: '40px', height: '40px' }} data-bs-toggle="dropdown" aria-expanded="false">
              </button>

              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => navigate('/MyProfile')}> Profile</button></li>
                <li><a className="dropdown-item" href="#">Edit Profile</a></li>
                <li><a className="dropdown-item" href="#">Dark Mode</a></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Log out</button></li>
              </ul>
            </div>
          </div>
        )}
      </nav>
      {children}
    </div>
  );
};

export default Layout;
