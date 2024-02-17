const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goodreads',
    password: 'stefan',
    port: 5432,
});

const createPost = async (userId, title, content) => {
    const result = await pool.query(
        'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
        [userId, title, content]
    );
    return result.rows[0];
};

const getPostsByUser = async (userId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching posts by user', error);
        throw error;
    }
};

const getPosts = async () => {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return result.rows;
};

module.exports = {
    createPost,
    getPostsByUser
};