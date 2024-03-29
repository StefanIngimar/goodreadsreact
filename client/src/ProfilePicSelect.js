import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function ProfilePictureSelection() {
  const [pictureUrl, setPictureUrl] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const defaultProfilePic = "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profilePictureUrl = pictureUrl || defaultProfilePic;
    const updatedUser = { ...user, profilePictureUrl, description };

    try {
        const response = await fetch('/api/user/choose-profile-picture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`, 
            },
            body: JSON.stringify({
                userId: user.userId,
                profilePictureUrl,
                description,
            }),
        });

        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        navigate('/timeline');
    } catch (error) {
        console.error('Error updating profile picture:', error);
        alert('Failed to update profile picture. Please try again.');
    }
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
        <button onClick={handleSkip} style={{marginLeft: '10px'}}>I don't want a picture</button>
        <h2>Write something about yourself</h2>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Your description"
          />
      </form>
    </div>
  );
}

export default ProfilePictureSelection;
