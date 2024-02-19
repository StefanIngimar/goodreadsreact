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
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError('Failed to fetch posts. Please try again later.');
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="main-container">
      </div>
      <div style={{ backgroundColor: 'beige', padding: '20px' }}>
        <div className='timeline'>
          <h1>Timeline</h1>
          {posts.map((post) => (
            <div key={post.id} className='post'>
              <p>{post.title}: {post.content}</p> {/* Display post title */}
            </div>
          ))}
        </div>
        <div className='wall'>
          <h2 className="whatsnew">What's new?</h2>
        </div>
      </div>
    </div>
  );
}

export default Timeline;