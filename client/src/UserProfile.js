import React, {useEffect, useState} from 'react';
import{useParams} from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

function UserProfile() {
  const {userId} = useParams();
  const [profile, setProfile] = useState({});
  const { user } = useUser();
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setProfile(response.data);
            setFetchError('');
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            setFetchError('User profile not found or could not be loaded.');
        }
    };

    fetchUserProfile();
}, [userId, user.token]);
  return (
    <div>
      <h1>User Profile</h1>
      {fetchError ? (
            <p>{fetchError}</p>
        ) : (
            <>
        {profile.username && (
          <>
          <img src={profile.profilePictureUrl} alt={`${profile.username}'s profile`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h2>{profile.username}</h2>
          <p>{profile.description}</p>
          </>
        )}
        </>
        )}
      <div className="addfriend">
      <button className="add-button">Send friend request</button>
      </div>
    </div>
  );
}

export default UserProfile;