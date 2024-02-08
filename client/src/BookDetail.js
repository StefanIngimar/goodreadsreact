import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const BookDetail = () => {
    const location = useLocation();
    const { book } = location.state;
    const { user } = useUser();

    if (!user) {
        console.log('No user logged in');
        return <div>Please log in to add books to your list</div>;
    }
    const apiUrl='http://localhost:3000';
    const addToUserList = async (listType) => {
        try {
            await axios.post(`${apiUrl}/api/user-books/${listType}`, {
                userId: user.userId,
                booksId: book.id,
            });
            alert(`Book added to ${listType}`);
        } catch (error) {
            console.error('Error adding book to list', error);
            alert('Failed to add book to list');
        }
    };

    const handleAddToRead = () => {
        addToUserList('read');
    };

    const handleAddtoWantToRead = () => {
        addToUserList('wantToRead');
    };

    const handleAddToCurrentlyReading = () => {
        addToUserList('currentlyReading');
    };

    return (
        <div>
            <h1>{book.volumeInfo.title}</h1>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <p>{book.volumeInfo.description}</p>
            <div className='buttons'>
                <button onClick={handleAddToRead}>Add to Read</button>
                <button onClick={handleAddtoWantToRead}>Add to Want to Read</button>
                <button onClick={handleAddToCurrentlyReading}>Add to Currently Reading</button>
            </div>
        </div>
    );
};

export default BookDetail;
