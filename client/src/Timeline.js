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
      <div className="main-container">
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