const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goodreads',
    password: 'stefan',
    port: 5432,
});

const createPost = async (userId, title, content, bookimageurl) => {
    const result = await pool.query(
        'INSERT INTO posts (user_id, title, content, bookimageurl) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, title, content, bookimageurl]
    );
    return result.rows[0];
};

const getPostsByUser = async (userId) => {
    try {
        console.log("Fetching posts for userID:", userId);
        const result = await pool.query(`
            SELECT 
                posts.id, 
                posts.title, 
                posts.content, 
                posts.created_at, 
                posts.bookimageurl, 
                users.username, 
                users.profile_picture_url AS userprofilepictureurl
            FROM posts
            JOIN users ON posts.user_id = users.id
            WHERE posts.user_id = $1
            ORDER BY posts.created_at DESC
        `, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching posts for user:', error);
        throw error;
    }
};

const getPosts = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                posts.id, 
                posts.title, 
                posts.content, 
                posts.created_at, 
                posts.bookimageurl, 
                users.username, 
                users.profile_picture_url AS userprofilepictureurl
            FROM posts
            JOIN users ON posts.user_id = users.id
            ORDER BY posts.created_at DESC
        `);
        return result.rows;
    } catch (error) {
        console.error('Error fetching posts from database:', error);
        throw error;
    }
};


module.exports = {
    createPost,
    getPosts,
    getPostsByUser
};