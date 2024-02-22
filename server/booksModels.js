const { Pool } = require('pg');
console.log(typeof process.env.DB_PASSWORD);
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goodreads',
    password: 'stefan',
    port: 5432,
});

const addBook = async (userId, bookId, status, bookImageUrl) => {
    const result = await pool.query(
        'INSERT INTO user_books (user_id, book_id, status, book_image_url) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, bookId, status, bookImageUrl]
    ).catch(err => console.error("Error executing addBook query:", err));
    return result.rows[0];
};

const getBooksByUser = async (userId, status = null) => {
    let query = 'SELECT user_id, book_id, status, book_image_url FROM user_books WHERE user_id = $1';
    let params = [userId];

    if (status) {
        query += ' AND status = $2';
        params.push(status);
    }

    const result = await pool.query(query, params);
    return result.rows;
};

const updateBookStatus = async (userId, bookId, newStatus) => {
    const result = await pool.query(
        'UPDATE user_books SET status = $3 WHERE user_id = $1 AND book_id = $2 RETURNING *',
        [userId, bookId, newStatus]
    );
    return result.rows[0];
};

const getBooksByUserAndType = async (userId, listType) => {
    const statusMap = {
        'currently-reading': 'currently reading',
        'want-to-read': 'want to read',
        'finished-reading': 'read',
    };
    const status = statusMap[listType];
    try {
        const result = await pool.query(
            `SELECT * FROM user_books WHERE user_id = $1 AND status = $2`,
            [userId, status]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching books by user and type:', error);
        throw error;
    }
};

const deleteBook = async (userId, bookId, book_image_url) => {
    const result = await pool.query(
        'DELETE FROM user_books WHERE user_id = $1 AND book_id = $2 RETURNING *',
        [userId, bookId, book_image_url]
    );
    return result.rowCount > 0;
};

module.exports = {
    addBook,
    getBooksByUser,
    updateBookStatus,
    deleteBook,
    getBooksByUserAndType
};
