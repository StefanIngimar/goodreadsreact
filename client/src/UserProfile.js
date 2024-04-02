import React, {useEffect, useState} from 'react';
import{useParams} from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

function UserProfile() {
  const {userId} = useParams();
  const [profile, setProfile] = useState({});
  const { user } = useUser();

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setProfile(response.data);
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    };

    fetchUserProfile();
}, [userId, user.token]);
  return (
    <div>
      <h1>User Profile</h1>
        {profile.username && (
          <>
          <img src={profile.profilePictureUrl} alt="User" />
          <h2>{profile.username}</h2>
          </>
        )}
      <div className="addfriend">
      <button className="add-button">Send friend request</button>
      </div>
    </div>
  );
}

export default UserProfile;