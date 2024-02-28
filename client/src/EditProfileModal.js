import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { useUser } from './UserContext';

const EditProfileModal = ({ isOpen, onClose, onSave, userData }) => {
  const [username, setUsername] = useState(userData && userData.username ? userData.username : '');
  const [email, setEmail] = useState(userData && userData.email ? userData.email : '');
  const [profilePictureUrl, setProfilePictureUrl] = useState(userData && userData.profilePictureUrl ? userData.profilePictureUrl : '');
  const [password, setPassword] = useState('');
  const { user } = useUser();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = {
        userId: user.userId,
        username,
        email,
        profilePictureUrl,
        password,
      };
    
      console.log('Sending payload:', payload);
    
      try {
        const apiUrl = 'http://localhost:8000/api/user/update';
        const response = await axios.put(apiUrl, payload);
    
        console.log('User updated successfully:', response.data);
        if (onSave) onSave(response.data);
        onClose();
      } catch (error) {
        console.error('Failed to update the user:', error);
      }
    };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit User">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
        </label>
        <label>
          Profile picture:
          <input type="profilepic" value={profilePictureUrl} onChange={(e) => setProfilePictureUrl(e.target.value)} name="profilepic" />
        </label>
        <label>
          Password (leave blank to keep unchanged):
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
