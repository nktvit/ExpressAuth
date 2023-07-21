require('dotenv').config();
const config = require('./config');
const express = require('express');
const {Pool} = require('pg');
const errorHandler = require('./errorHandler');

// Import routes
const loginRoute = require('./routes/login');
const protectedRoute = require('./routes/protected');

// PostgreSQL database configuration
const pool = new Pool(config.database);

const app = express();
app.use(express.json());

// Routes
app.use('/login', loginRoute);
app.use('/protected', protectedRoute);

app.use(errorHandler);

app.listen(config.server.port, () => {
    console.log(`Server is running on http://localhost:${config.server.port}`);
});