import React, {useEffect, useState} from 'react';
import{useParams} from 'react-router-dom';

function UserProfile() {
  const {userId} = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {

  }, [userId]);
  return (
    <div>
      <h1>User Profile</h1>

       <div className="addfriend">
          <button className="add-button">Send friend request</button>
        </div>
    </div>
  );
}

export default UserProfile;