This is a website that I created in React, with a Node server. The website is a copy of Goodreads, where users can search for books, add them to their respective lists 'Have read', 'Want to read', and 'Currently reading'. As well as following their friends to see what books they are reading. I created this project to teach myself how to use react. The search function comes from the Google Books API.

The website is not yet finished, but it is still functional. It runs on a Node JS server and React. The database is in PostgreSQL, and I use Knex for the database migrations.

---------
**How to run the project**

# 1. Clone the Repository

Clone the project from the repository.
Make sure you have Node.js installed on your system.

For the client:

>cd client

>npm install

For the server:

>cd ../server

>npm install

# 2. Set Up Environment Variables

Create a .env file in the root of the server directory with the following content (adjust values as needed):

>PORT=5000

>DATABASE_URL=postgres://<yourusername>:<yourpassword>@localhost:5432/<your_database>

>GOOGLE_BOOKS_API_KEY=<your_google_books_api_key>

Ensure that you replace the placeholders with your actual PostgreSQL credentials and Google Books API key. You can get an API key from the Google Developers Console.

# 3. Set Up PostgreSQL Database

Make sure you have PostgreSQL installed.

Next, create a new database for the project:

>psql -U <username>

>CREATE DATABASE <your_database>;
>
Then, you'll need to run migrations using Knex to set up your database tables.

Inside the server directory, run:

>npx knex migrate:latest

This will set up the necessary tables for the application.

# 4. Run the Server

To start the Node.js server, run the following command inside the server directory:

>npm start

This will start your Node.js backend server.

# 5. Run the React Client

Now, you can run the React frontend. Navigate to the client directory:

>cd client

>npm start

This will start the React development server, and you can view the app by visiting http://localhost:3000 in your browser.

------------------------

**Screenshots**

While the UI is not finished, the backend is nearly finished. Here is how the website looks so far

![image](https://github.com/user-attachments/assets/487daac6-c579-4c1c-b815-7058ab5df1a0)

![image](https://github.com/user-attachments/assets/35850d50-d890-4c26-a446-903241c1a6d0)

![image](https://github.com/user-attachments/assets/e7f6eb97-9bbf-489b-add7-827433269da1)

![image](https://github.com/user-attachments/assets/91c66095-09d3-42de-94f8-8a96fc7cd1dc)



