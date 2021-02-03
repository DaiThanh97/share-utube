require('dotenv').config();
const express = require('express');

const authRouter = require('./routes/auth.route');
const movieRouter = require('./routes/movie.route');
const errorHandler = require('./middlewares/error-handler');
const CustomError = require('./classes/CustomError');
const { STATUS_CODE } = require('./configs/constants');

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/movie', movieRouter);

// 404 Not Found
app.use((req, res, next) => {
    next(new CustomError(STATUS_CODE.NOT_FOUND, "Not Found!"));
});

// Error Handler
app.use(errorHandler);

module.exports = app;