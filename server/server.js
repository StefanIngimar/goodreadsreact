const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const { createPost, getPostsByUser, getPosts } = require('./postModels');
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./middleware');
const { addBook, getBooksByUser, updateBookStatus, deleteBook, getBooksByUserAndType } = require('./booksModels');
const { updateUser } = require('./userModels');

require('dotenv').config({path: __dirname + '/../.env'});
console.log('Database user:', process.env.DB_USER);
const app = express();
app.use(express.json());
app.use(cors());
console.log('Database password:', process.env.DB_PASSWORD);
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// middleware to parse json bodies
app.use(bodyParser.json());

// registration Endpoint
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        const newUser = result.rows[0];

        if(!newUser){
            return res.status(400).send("User could not be created");
        }

        const token = jwt.sign(
            { userId: newUser.id, username: newUser.username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "User created successfully",
            user: {
                userId: newUser.id,
                username: newUser.username,
                email: newUser.email
            },
            token: token
        });
    } catch (error) {
        console.error('Error occurred', error);
        if(error.code === '23505'){
            return res.status(409).send("Username already exists");
        }
        res.status(500).send("Server error");
    }
});

app.post('/api/user/choose-profile-picture', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { profilePictureUrl, description  } = req.body;

    try {
        const result = await db.query(
            'UPDATE users SET profile_picture_url = $1, description = $2 WHERE id = $3 RETURNING *',
            [profilePictureUrl, description, userId]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// login endpoint
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                res.json({ message: "Login successful", token, userId: user.id, username: user.username, profilePictureUrl: user.profile_picture_url});
            } else {
                res.status(400).send("Invalid password");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.put('/api/user/update', async (req, res) => {
    const { userId, username, email, password, profilePictureUrl, description } = req.body;
    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    try {
        const updatedUser = await updateUser(userId, username, email, hashedPassword, profilePictureUrl, description);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/api/user/profile', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await db.query('SELECT id, username, email, profile_picture_url, description FROM users WHERE id = $1', [userId]);
        if (result.rows.length > 0) {
            const userProfile = result.rows[0];
            res.json(userProfile);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/api/user-books/:listType', async (req, res, next) =>{
    console.log("Received request body:", req.body);
    const { userId, bookId, bookImageUrl } = req.body;
    const listType = req.params.listType;
    console.log("Request to add book:", userId, bookId);
    if (!userId || !bookId) {
        return res.status(400).send("Missing user ID or book ID");
    }
    try{
        const result = await addBook(userId, bookId, listType, bookImageUrl);
        if(!result) throw new Error('Function did not return a result');
        res.json(result);
    } catch(error){
        console.error('Error adding book:', error);
        if(error.response){
            console.error(error.response.data);
        }
        next(error);
    }
});

app.get('/api/user-books/:listType', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { listType } = req.params;
    
    try {
        console.log(getBooksByUserAndType);
        const books = await getBooksByUserAndType(userId, listType);
        res.json(books);
    } catch (error) {
        console.error(`Error fetching books for listType: ${listType}`, error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/friends/add', authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const { friendId } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO friends (user_id, friend_id, status) VALUES ($1, $2, $3) RETURNING *',
            [userId, friendId, 'pending']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/friends/list', authenticateToken, async (req, res) => {
    const { userId } = req.user;

    try {
        const result = await db.query(
            'SELECT users.id, users.username, users.profile_picture_url FROM users JOIN friends ON users.id = friends.friend_id WHERE friends.user_id = $1 AND friends.status = $2',
            [userId, 'accepted']
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/books/:bookId/friends-reading', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { bookId } = req.params;

    try {
        const query = `
            SELECT u.id, u.username, u.profile_picture_url 
            FROM users u
            INNER JOIN friends f ON f.friend_id = u.id
            INNER JOIN user_books ub ON ub.user_id = u.id
            WHERE f.user_id = $1 AND ub.book_id = $2 AND f.status = 'accepted'
        `;
        const result = await db.query(query, [userId, bookId]);

        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).send('No friends found reading this book.');
        }
    } catch (error) {
        console.error('Error fetching friends reading the book:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/posts', authenticateToken, async (req, res) => {
    try {
        console.log(req.body);
        const{userId, title, content, bookImageUrl} = req.body;
        const newPost = await createPost(userId, title, content, bookImageUrl);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/posts', authenticateToken, async(req, res) =>{
    const userId = req.user.userId;
    try {
        const posts = await getPostsByUser(userId);
        res.json(posts);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        res.status(500).send('Failed to fetch posts');
    }
});
console.log({ createPost, getPostsByUser, getPosts });


app.listen(8000, () => {console.log("Server started on port 8000")});