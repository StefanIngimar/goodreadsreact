const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goodreads',
    password: 'stefan',
    port: 5432,
});

const getUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

const createUser = async (username, password) => {
    const result = await pool.query('INSERT INTO users(username, email, password, profile_picture_url) VALUES($1, $2, $3, $4) RETURNING *', [username, email, password, profilePictureUrl]);
    return result.rows[0];
};

module.exports = {
    getUsers,
    createUser
};