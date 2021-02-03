require('dotenv').config();
const express = require('express');

const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.json());

// Routes
app.use('/auth', authRouter);

module.exports = app;