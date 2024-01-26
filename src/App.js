import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './Register';
import StarterPage from './StarterPage';
import ProfilePictureSelection from './ProfilePicSelect';
import Timeline from './Timeline';
import MyProfile from './MyProfile';
import UserProfile from './UserProfile';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<StarterPage />} />
        <Route path="/choose-profile-picture" element={<ProfilePictureSelection/>}/>
        <Route path="/timeline" element={<Timeline/>}/>
        <Route path="/MyProfile" element={<MyProfile/>}/>
        <Route path="/UserProfile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;