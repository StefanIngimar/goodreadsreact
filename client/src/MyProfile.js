import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProfile.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const MyProfile = () => {
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [finishedReading, setFinishedReading] = useState([]);
    const [description, setDescription] = useState('');
    const apiUrl = 'http://localhost:8000/api/user-books';
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    const navigate = useNavigate();
    const {user} = useUser();

    useEffect(() => {
        const fetchBooks = async () => {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const userProfileUrl = 'http://localhost:8000/api/user/profile';
            try {
                const [currentlyReadingResponse, wantToReadResponse, finishedReadingResponse, userProfileResponse] = await Promise.all([
                axios.get(`${apiUrl}/currently-reading`, config),
                axios.get(`${apiUrl}/want-to-read`, config),
                axios.get(`${apiUrl}/finished-reading`, config),
                axios.get(userProfileUrl, config),
                ]);
                setCurrentlyReading(currentlyReadingResponse.data);
                setWantToRead(wantToReadResponse.data);
                setFinishedReading(finishedReadingResponse.data);
                setDescription(userProfileResponse.data.description);
            } catch (error) {
                console.error("Failed to fetch book lists", error);
            }
        };
        fetchBooks();
    }, [token]);
    
    const handleBookClick = async (bookId) => {
        if(bookId) {
            const apiKey = "AIzaSyA5IDmX6E5L05YAxOFfQqiUnI9_WOReuMo";
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
                navigate('/BookDetail', { state: { book: response.data } });
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        } else {
            console.error('Book ID is undefined or null');
        }
    };

    const renderBookImages = (books) => {
        return (
            <div className="books-container">
                {books.map(book => (
                    <img key={book.book_id} src={book.book_image_url} alt="Book cover" className="book-image" onClick={() => handleBookClick(book.book_id)}/>
                ))}
            </div>
        );
    };
        return (
            <div>
            <div className='user-container'>
            <div className="profile-pic" style={{ backgroundImage: `url(${user.profilePictureUrl})`, backgroundSize: 'cover', borderRadius: '50%', width: '150px', height: '150px' }} data-bs-toggle="dropdown" aria-expanded="false">
                </div>
            </div>
            <div className="flex-container">
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Currently Reading
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {renderBookImages(currentlyReading)}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Want to Read
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {renderBookImages(wantToRead)}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Finished Reading
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {renderBookImages(finishedReading)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-description">
                <h2>About me</h2>
                <p>{description}</p>
            </div>
        </div>
        </div>
        );
    };

export default MyProfile;