require('dotenv').config();
const express = require('express');

const authRouter = require('./routes/auth.route');
const movieRouter = require('./routes/movie.route');
const errorHandler = require('./middlewares/error-handler');
const CustomError = require('./classes/CustomError');
const { STATUS_CODE, ROUTES } = require('./configs/constants');

const app = express();

app.use(express.json());

// Routes
app.use(ROUTES.AUTH.PREFIX, authRouter);
app.use(ROUTES.MOVIE.PREFIX, movieRouter);

// 404 Not Found
app.use((req, res, next) => {
    next(new CustomError(STATUS_CODE.NOT_FOUND, "Not Found!"));
});

// Error Handler
app.use(errorHandler);

module.exports = app;