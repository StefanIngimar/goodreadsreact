import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function ProfilePictureSelection() {
  const [pictureUrl, setPictureUrl] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const defaultProfilePic = process.env.PUBLIC_URL + '/anon.webp';

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = { ...user, profilePictureUrl: pictureUrl || defaultProfilePic };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/timeline');
  };

  const handleSkip = () => {
    const updatedUser = { ...user, profilePictureUrl: defaultProfilePic };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/timeline');
  };

  return (
    <div style={{ backgroundColor: 'beige', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <h2>Choose Your Profile Picture</h2>
        <input 
          type="text" 
          value={pictureUrl} 
          onChange={(e) => setPictureUrl(e.target.value)} 
          placeholder="Profile picture URL" 
        />
        <button type="submit">Submit</button>
        <button onClick={handleSkip} style={{marginLeft: '10px'}}>Skip</button>
      </form>
    </div>
  );
}

export default ProfilePictureSelection;
