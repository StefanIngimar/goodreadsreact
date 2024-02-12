import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Registration from './Register';
import StarterPage from './StarterPage';
import ProfilePictureSelection from './ProfilePicSelect';
import Timeline from './Timeline';
import MyProfile from './MyProfile';
import UserProfile from './UserProfile';
import Layout from './Layout';
import BookSearch from './BookSearch';
import BookDetail from './BookDetail';
import { UserProvider } from './UserContext';
import './App.css';
import { Dropdown } from 'bootstrap';

const isLoggedIn = () =>{
  return Boolean(localStorage.getItem('user'));
};

function App() {

  return (
    <UserProvider>
    <Router>
    <div className="app-header">
      <div className='global-header'>
          <div className="logo">
          <Link to="/timeline" className="header-link"><span>Good</span><span>reads</span></Link>
          </div>
          </div>
        </div>
      <Routes>
      <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/" element={<StarterPage/>} />
        <Route path="/choose-profile-picture" element={<Layout><ProfilePictureSelection/></Layout>}/>
        <Route path="/timeline" element={isLoggedIn() ? <Layout><Timeline /></Layout> : <Navigate replace to="/" />} />
        <Route path="/MyProfile" element={<Layout><MyProfile/></Layout>}/>
        <Route path="/UserProfile" element={<Layout><UserProfile/></Layout>}/>
        <Route path="/" element={<Layout><BookSearch/></Layout>}/>
        <Route path="/BookDetail" element={<Layout><BookDetail/></Layout>}/>
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;