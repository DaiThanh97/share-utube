const express = require('express');
const router = express.Router();

const { signUp } = require('./../controllers/auth.controller');
const validate = require('./../validations/auth.validation');
const validateRequest = require('./../middlewares/validate-request');

router.post(
    '/signUp',
    validate.signUp,
    validateRequest,
    signUp
);

module.exports = router;