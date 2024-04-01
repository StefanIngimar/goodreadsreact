import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { useUser } from './UserContext';

const FindFriendsModal = ({ isOpen, onClose, onSave }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState('');
    const { user } = useUser();

    const handleSearch = async () => {
        setSearchResults([]);
        setSearchError('');

        try {
          const response = await axios.get(`http://localhost:8000/api/users/search?username=${searchTerm}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setSearchResults(response.data);
        } catch (error) {
          console.error("Failed to search for users", error);
          setSearchError('Failed to search for users. Please try again later.');
        }
    };

    return (
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onClose} 
        contentLabel="Find Friends"
        style={{
          content: {
            width: '600px',
            height: '600px',
            margin: 'auto'
          }
        }}>
          <div className="modal-content">
            <span className="close-button" onClick={onClose}>&times;</span>
            <input
              type="text"
              placeholder="Search by username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {searchError && <div className="error">{searchError}</div>}
            <div className="search-results">
              {searchResults.map(user => (
                <div key={user.id}>{user.username}</div>
              ))}
            </div>
          </div>
        </Modal>
    );
};
export default FindFriendsModal;