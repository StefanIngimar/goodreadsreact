import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function ProfilePictureSelection({ onPictureSubmit }) {
  const [pictureUrl, setPictureUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(typeof onPictureSubmit === 'function'){
        onPictureSubmit(pictureUrl);
    }
    onPictureSubmit(pictureUrl);
    navigate('/timeline');
  };

  const handleSkip = () =>{
    navigate('/timeline');
  }

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
        <button type='skip' onClick={handleSkip} style={{marginLeft: '10px'}}>Skip</button>
      </form>
    </div>
  );
}

export default ProfilePictureSelection;