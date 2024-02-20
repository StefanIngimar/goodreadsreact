import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Timeline.css';
import { useUser } from './UserContext';

function Timeline() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const {user} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setPosts(response.data);
        setError('');
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError('Failed to fetch posts. Please try again later.');
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="timeline-container">
      <h1 className="timeline-heading">Timeline</h1>
      <div className="posts-container">
      {posts.map((post) => (
  <div key={post.id} className="post-container">
    <div className="post-header">
      {post.userprofilepictureurl && <img src={post.userprofilepictureurl} alt="User" className="user-profile-pic"/>}
    </div>
    <p className='title'>{post.title}</p>
    <div className="content-and-image">
    <p className="post-content">{post.content}</p>
    {post.bookimageurl && <img src={post.bookimageurl} alt="Book" className="book-image"/>}
  </div>
    <div className="buttons-container">
      <button className="like-button">Like</button>
      <button className="comment-button">Comment</button>
    </div>
  </div>
))}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Timeline;