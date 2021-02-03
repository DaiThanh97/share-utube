const express = require('express');
const router = express.Router();

const { share } = require('./../controllers/movie.controller');
const validate = require('./../validations/movie.validation');
const validateRequest = require('./../middlewares/validate-request');
const requireAuth = require('./../middlewares/require-auth');

router.post(
    '/share',
    requireAuth,
    validate.share,
    validateRequest,
    share
);

module.exports = router;