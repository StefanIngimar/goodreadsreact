import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './BookSearch.css';

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /*const handleSearch = async () => {
    setLoading(true);
    setError(null);
    console.log('starting search');*/
    const fetchBooks = useCallback(async () => {
      if (!query) return;
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
  }, [query]);

  useEffect(() => {
    const debouncedSearch = debounce(fetchBooks, 500);
    debouncedSearch();
  }, [fetchBooks]);

  const handleBookClick = (book) =>{
    navigate('/BookDetail', {state: {book}});
  };

  return (
    <div>
      <div className='search-container'>
        <input
        type='text'
        className='search-input'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for books...'
        />
        </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="books-container">
  {books.map((book) => (
    <div key={book.id} className="book-item" onClick={() => handleBookClick(book)}>
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
