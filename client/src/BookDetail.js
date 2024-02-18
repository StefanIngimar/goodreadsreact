import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const BookDetail = () => {
    const location = useLocation();
    const { book } = location.state;
    const { user } = useUser();

    const userId = user?.id;
    const token = user?.token;;

    if (!userId || !token) {
        console.log('No user logged in');
        return <div>Please log in to add books to your list</div>;
    }
    const apiUrl = 'http://localhost:8000';
    //const userId = user.userId;

    if (!userId) {
        console.error('UserID is undefined. Please check the user state and localStorage.');
        return <div>Error: User ID not found. Please log in again.</div>;
    }

    const createPost = async (title, content) => {
        const userStored = localStorage.getItem('user');
        if(!userStored){
            console.error('User data not available.');
            return;
        }
        const user = JSON.parse(userStored);
        const token = user.token;

        if(!token){
            console.error('Authentication token is not available.');
        }
        try {
            const apiUrl = 'http://localhost:8000'; 
            await axios.post(`${apiUrl}/api/posts`, {
              userId: user.userId,
              title,
              content
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            console.log('Post created successfully');
          } catch (error) {
            console.error('Error creating post:', error.response ? error.response.data : error);
          }
        };

    const addToUserList = async (listType) => {
        const userId = user?.userId || JSON.parse(localStorage.getItem('user'))?.userId;
        console.log('Attempting to add book with userID:', userId);

        if (!userId) {
            console.log('User ID is undefined. Please log in.');
            return;
        }
        try {
            await axios.post(`${apiUrl}/api/user-books/${listType}`, {
                userId: userId,
                bookId: book.id,
            });
            alert(`Book added to ${listType} list.`);
            const bookTitle = book.volumeInfo.title;
            const content = `${user.username} has added ${bookTitle} to their ${listType} list.`;
            const title = "New Book Added";
            await createPost(title, content);
        } catch (error) {
            console.error('Error adding book to list:', error);
            alert('Failed to add book to list.');
        }
    };

    const handleAddToRead = () => {
        addToUserList('read');
    };

    const handleAddtoWantToRead = () => {
        addToUserList('want to read');
    };

    const handleAddToCurrentlyReading = () => {
        addToUserList('currently reading');
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
