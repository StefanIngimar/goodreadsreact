import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Timeline.css';

function Timeline() {
  const navigate = useNavigate();
  const goToProfile=()=>{
    navigate('/MyProfile');
  }
  return (
    <div>
      <div className="main-container"> {/* This wraps the heading and the profile button */}
        <div className='profile'>
          <button onClick={goToProfile}>Profile</button>
        </div>
      </div>
      <div style={{ backgroundColor: 'beige', padding: '20px' }}>
        <div className='timeline'>
          <h1>Timeline</h1>
        </div>
        <div className='wall'>
          <h2 className="whatsnew">What's new?</h2>
        </div>
      </div>
    </div>
  );
}

export default Timeline;