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
    </div>
  );
}

export default UserProfile;