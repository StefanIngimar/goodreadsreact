import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './Register';
import StarterPage from './StarterPage';
import ProfilePictureSelection from './ProfilePicSelect';
import Timeline from './Timeline';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<StarterPage />} />
        <Route path="/choose-profile-picture" element={<ProfilePictureSelection/>}/>
        <Route path="/timeline" element={<Timeline/>}/>
      </Routes>
    </Router>
  );
}

export default App;