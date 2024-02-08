import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    console.log('starting search');

    try {
      const apiKey = "AIzaSyA5IDmX6E5L05YAxOFfQqiUnI9_WOReuMo";
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
      console.log('data received:', response.data);
      setBooks(response.data.items);
    } catch (error) {
      console.error('error during fetch:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (book) =>{
    navigate('/book-detail', {state: {book}});
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {books.map((book) => (
          <div key={book.id} onClick={() => handleBookClick(book)}>
            <h3>{book.volumeInfo.title}</h3>
            <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
