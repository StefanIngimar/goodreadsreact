const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goodreads',
    password: 'stefan',
    port: 5432,
});

const createPost = async (userId, content) => {
    const result = await pool.query(
        'INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *',
        [userId, content]
    );
    return result.rows[0];
};

const getPostsByUser = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM posts WHERE user_id = $1',
        [userId]
    );
    return result.rows;
};

const getPosts = async () => {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return result.rows;
};


module.exports = {
    createPost,
    getPostsByUser
};