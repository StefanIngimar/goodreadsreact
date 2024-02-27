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
    let query = 'UPDATE users SET';
    let params = [];
    let setParts = [];
    let counter = 1;
    if (username) {
        setParts.push(`username = $${counter}`);
        params.push(username);
        counter++;
    }
    if (email) {
        setParts.push(`email = $${counter}`);
        params.push(email);
        counter++;
    }
    if (profilePictureUrl) {
        setParts.push(`profile_picture_url = $${counter}`);
        params.push(profilePictureUrl);
        counter++;
    }
    if (password) {
        setParts.push(`password = $${counter}`);
        params.push(password);
        counter++;
    }
    if (setParts.length === 0) {
        throw new Error("No fields provided for update");
    }
    query += setParts.join(', ') + ` WHERE id = $${counter} RETURNING *`;
    params.push(id);

    const result = await pool.query(query, params);
    return result.rows[0];
};

module.exports = {
    getUsers,
    createUser,
    updateUser
};