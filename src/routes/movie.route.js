const express = require('express');
const router = express.Router();

const { share, getMovies } = require('./../controllers/movie.controller');
const validate = require('./../validations/movie.validation');
const validateRequest = require('./../middlewares/validate-request');
const requireAuth = require('./../middlewares/require-auth');
const { ROUTES } = require('./../configs/constants');

router.get('/', getMovies);

router.post(
    ROUTES.MOVIE.SHARE,
    requireAuth,
    validate.share,
    validateRequest,
    share
);

module.exports = router;