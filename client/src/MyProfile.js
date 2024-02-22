import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProfile.css';

const MyProfile = () => {
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [finishedReading, setFinishedReading] = useState([]);
    const apiUrl = 'http://localhost:8000/api/user-books';

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
            try {
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
        fetchBooks();
    }, []);

    const renderBookImages = (books) => {
        return books.map(book => (
            <img key={book.book_id} src={book.book_image_url} alt="Book cover" style={{ width: '100px', margin: '10px' }} />
        ));
    };
        return (
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
        );
    };

export default MyProfile;