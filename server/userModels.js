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
    const result = await pool.query('INSERT INTO users(username, email, password, profile_picture_url) VALUES($1, $2, $3, $4) RETURNING id, username, email, profile_picture_url',
    [username, email, password, profilePictureUrl]);
    return result.rows[0];
};

const updateUser = async (id, username, email, password, profilePictureUrl) => {
    let query = 'UPDATE users SET username = $1, email = $2, profile_picture_url = $4 WHERE id = $5 RETURNING *';
    let params = [username, email, profilePictureUrl, id];

    if (password) {
        query = 'UPDATE users SET username = $1, email = $2, password = $3, profile_picture_url = $4 WHERE id = $5 RETURNING *';
        params = [username, email, password, profilePictureUrl, id];
    }

    const result = await pool.query(query, params);
    return result.rows[0];
};

module.exports = {
    getUsers,
    createUser,
    updateUser
};