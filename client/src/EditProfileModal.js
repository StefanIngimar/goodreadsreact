import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const EditProfileModal = ({ isOpen, onClose, onSave, userData }) => {
    const [username, setUsername] = useState(userData ? userData.username : '');
    const [email, setEmail] = useState(userData ? userData.email : '');
    const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ username, email, password });
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
