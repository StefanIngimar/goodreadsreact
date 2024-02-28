import React, { useState } from 'react';
import BookSearch from './BookSearch';
import './Layout.css'
import { useNavigate, Link } from 'react-router-dom';
import {useUser} from './UserContext';
import EditProfileModal from './EditProfileModal';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [showEditModal, setShowEditModal] = useState(false);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSaveChanges = async (updatedProfile) => {
    try {
      const response = await fetch(`/api/users/${updatedProfile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User updated successfully:', data);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        setShowEditModal(false);
      } else {
        console.error('Failed to update the user:', await response.text());
      }
    } catch (error) {
      console.error('Error updating the user:', error);
    }
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
                <li><button className="dropdown-item" onClick={() => setShowEditModal(true)}>Edit Profile</button></li>
                <li><a className="dropdown-item" href="#">Dark Mode</a></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Log out</button></li>
              </ul>
            </div>
          </div>
        )}
      </nav>
      {children}
      <EditProfileModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} onSave={handleSaveChanges} userData={user} />
    </div>
  );
};

export default Layout;
