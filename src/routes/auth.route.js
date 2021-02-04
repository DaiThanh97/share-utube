const express = require('express');
const router = express.Router();

const { logIn } = require('./../controllers/auth.controller');
const validate = require('./../validations/auth.validation');
const validateRequest = require('./../middlewares/validate-request');
const { ROUTES } = require('./../configs/constants');

router.post(
    ROUTES.AUTH.LOGIN,
    validate.logIn,
    validateRequest,
    logIn
);

module.exports = router;