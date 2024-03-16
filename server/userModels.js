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
    const result = await pool.query('INSERT INTO users(username, email, password, profile_picture_url, description) VALUES($1, $2, $3, $4, $5) RETURNING id, username, email, profile_picture_url, description',
    [username, email, password, profilePictureUrl, description]);
    return result.rows[0];
};

const updateUser = async (id, username, email, hashedPassword, profilePictureUrl, description) => {
    let query = 'UPDATE users SET ';
    let params = [];
    let setParts = [];
    let counter = 1;

    if (username) {
        setParts.push(`username = $${counter++}`);
        params.push(username);
    }
    if (email) {
        setParts.push(`email = $${counter++}`);
        params.push(email);
    }
    if (profilePictureUrl) {
        setParts.push(`profile_picture_url = $${counter++}`);
        params.push(profilePictureUrl);
    }
    if (hashedPassword) {
        setParts.push(`password = $${counter++}`);
        params.push(hashedPassword);
    }
    if (description) {
        setParts.push(`description = $${counter++}`);
        params.push(description);
    }

    if (setParts.length === 0) {
        throw new Error("No fields provided for update");
    }

    query += setParts.join(', ') + ` WHERE id = $${counter} RETURNING *;`;
    params.push(id);

    try {
        const result = await pool.query(query, params);
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            throw new Error("User not found or no changes made.");
        }
    } catch (error) {
        console.error('Error updating user in updateUser:', error);
        throw error;
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser
};