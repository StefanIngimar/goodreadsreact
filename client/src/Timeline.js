import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Timeline.css';
import { useUser } from './UserContext';

function Timeline() {
  const [posts, setPosts] = useState([]);
  const {user} = useUser();
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchPosts = async () => {
      try{
        const response = await axios.get('http://localhost:3000/api/posts');
        setPosts(response.data);
      } catch(error){
        console.error("Failed to fetch posts", error);
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
          {posts.map((post)=>(
            <div key={post.id} className='post'>
              <p>{post.content}</p>
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