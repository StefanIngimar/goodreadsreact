import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProfile.css';

const MyProfile = () => {
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [finishedReading, setFinishedReading] = useState([]);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const apiUrl = 'http://localhost:8000/api/user-books';
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

    useEffect(() => {
        const fetchBooksAndPosts = async () => {
            try {
                // Fetching posts
                const postsResponse = await axios.get(`http://localhost:8000/api/posts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }); setPosts(postsResponse.data);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
            
                const [currentlyReadingResponse, wantToReadResponse, finishedReadingResponse] = await Promise.all([
                axios.get(`${apiUrl}/currently-reading`, config),
                axios.get(`${apiUrl}/want-to-read`, config),
                axios.get(`${apiUrl}/finished-reading`, config),
                ]);
                setCurrentlyReading(currentlyReadingResponse.data);
                setWantToRead(wantToReadResponse.data);
                setFinishedReading(finishedReadingResponse.data);
            } catch (error) {
                console.error("Failed to fetch book lists", error);
            }
        };
        fetchBooksAndPosts();
    }, [token]);

    const renderBookImages = (books) => {
        return (
            <div className="books-container">
                {books.map(book => (
                    <img key={book.book_id} src={book.book_image_url} alt="Book cover" className="book-image" />
                ))}
            </div>
        );
    };
        return (
        <div className='profile-container'>
            <div className="user-posts-section">
                <h2>Posts</h2>
                <div className="posts-container">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.bookImageUrl && (
                            <img src={post.bookImageUrl} alt="Book cover" className="post-book-image" />
                        )}
                    </div>
                ))}
            </div>
        </div>
            <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Currently reading
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {renderBookImages(currentlyReading)}
                </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Want to read
                </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {renderBookImages(wantToRead)}
                </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Finished reading
                </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {renderBookImages(finishedReading)}
                </div>
                </div>
            </div>
            </div>
            </div>
            
        );
    };

export default MyProfile;