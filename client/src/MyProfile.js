import React, { Component } from 'react';
import './MyProfile.css';
import { Dropdown } from 'bootstrap';

class MyProfile extends Component {
    render() {
        return (
            <div className="profile-container">
                <div className="profile-section">
                    <img src="path_to_profile_picture.jpg" alt="Profile" className="profile-picture" />
                    <button className="profile-button">Show Friends</button>
                    <button className="profile-button">Currently Reading</button>
                    <button className="profile-button">Want to Read</button>
                    <button className="profile-button">Read</button>
                </div>
                <div className="settings-dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                        Settings
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Edit Profile</a></li>
                        <li><a className="dropdown-item" href="#">Dark mode</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default MyProfile;