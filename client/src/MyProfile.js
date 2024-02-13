import React, { Component } from 'react';
import './MyProfile.css';

class MyProfile extends Component {
    render() {
        return (
            <div className="profile-container">
                <div className="profile-section">
                    <button className="profile-button">Show Friends</button>
                    <button className="profile-button">Currently Reading</button>
                    <button className="profile-button">Want to Read</button>
                    <button className="profile-button">Read</button>
                </div>
            </div>
        );
    }
}

export default MyProfile;