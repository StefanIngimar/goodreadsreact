import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Switch } from 'react-router-dom';
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
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Modal from 'react-modal';

const isLoggedIn = () =>{
  return Boolean(localStorage.getItem('user'));
};
Modal.setAppElement('#root');
function App() {

  return (
    <UserProvider>
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/" element={<StarterPage/>} />
        <Route path="/choose-profile-picture" element={<Layout><ProfilePictureSelection/></Layout>}/>
        <Route path="/timeline" element={isLoggedIn() ? <Layout><Timeline /></Layout> : <Navigate replace to="/" />} />
        <Route path="/MyProfile" element={isLoggedIn() ? <Layout><MyProfile/></Layout> : <Navigate replace to="/" />}/>
        <Route path="/UserProfile/:userId" element={<Layout><UserProfile/></Layout>}/>
        <Route path="/" element={<Layout><BookSearch/></Layout>}/>
        <Route path="/BookDetail" element={isLoggedIn() ? <Layout><BookDetail/></Layout> : <Navigate replace to="/"/>}/>
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;