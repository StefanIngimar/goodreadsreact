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
  const handleFindFriends = () => {
    // Navigate to the Find Friends page or open a modal
    navigate('/find-friends'); // Assuming you have a route set up for this
};

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

  const handleBookClick = (bookId) => {
    navigate(`/bookdetail/${bookId}`);
  };
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
    {post.bookimageurl && <img src={post.bookimageurl} alt="Book" className="book-image" onClick={() => handleBookClick(post.bookId)}/>}
  </div>
    <div className="buttons-container">
      <button className="like-button">Like</button>
      <button className="comment-button">Comment</button>
    </div>
    <div className="interactions-info">
      <span><i className="like-icon"/> 10 Likes</span>
      <span><i className="comment-icon"/> 5 Comments</span>
    </div>
  </div>
))}

        {error && <div className="error">{error}</div>}
      </div>
      <button onClick={handleFindFriends}>Find Friends</button>
    </div>
  );
}

export default Timeline;