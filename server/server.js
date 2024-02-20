const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const { createPost, getPostsByUser, getPosts } = require('./postModels');
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./middleware');
const { addBook } = require('./booksModels');

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
    const { profilePictureUrl } = req.body;

    try {
        const result = await db.query(
            'UPDATE users SET profile_picture_url = $1 WHERE id = $2 RETURNING *',
            [profilePictureUrl, userId]
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

app.post('/api/user-books/:listType', async (req, res, next) =>{
    console.log("Received request body:", req.body);
    const{userId, bookId} = req.body;
    console.log("Request to add book:", userId, bookId);
    if (!userId || !bookId) {
        return res.status(400).send("Missing user ID or book ID");
    }
    try{
        const result = await addBook(userId, bookId, req.params.listType);
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