import React, {useEffect, useState} from 'react';
import{useParams} from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';
import './UserProfile.css'
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
  const {userId} = useParams();
  const [profile, setProfile] = useState({});
  const { user } = useUser();
  const [fetchError, setFetchError] = useState('');
  const [imageError, setImageError] = useState(false);

  const sendFriendRequest = async () => {
    try {
        await axios.post(`http://localhost:8000/api/friends/add`, 
            { friendId: userId },
            { headers: { Authorization: `Bearer ${user.token}` } }
        );
        toast.success('Friend request sent', {
            position: "top-center",
            autoClose: 5000,
        });
    } catch (error) {
        console.error("Failed to send friend request", error);
        toast.error('Failed to send friend request. Please try again.', {
            position: "top-center",
            autoClose: 5000,
        });
    }
  };

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

//toast.configure();

  return (
    <div className="profile-container">
      {fetchError ? (
        <p>{fetchError}</p>
      ) : (
        <>
          {profile.username && (
            <>
              <img 
                src={profile.profile_picture_url} 
                alt={`${profile.username}'s profile`} 
                className="profile-image" 
          onError={() => setImageError(true)} />
          <h2>{profile.username}</h2>
          <p>{profile.description}</p>
          </>
        )}
        </>
        )}
      <div className="addfriend">
      <button className="add-button" onClick={sendFriendRequest}>Send friend request</button>
      <ToastContainer
      position='top-center'
      autoClose={5000}
      closeOnClick />
      </div>
    </div>
  );
}

export default UserProfile;