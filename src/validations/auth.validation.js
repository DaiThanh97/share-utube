const { check } = require('express-validator');
const { WARNING } = require('./../configs/constants');

const validate = {
    logIn: [
        check('username')
            .isLength({ min: 6, max: 15 }).withMessage(WARNING.USERNAME_LENGTH_STRICT)
            .isAlphanumeric().withMessage(WARNING.USERNAME_SPECIAL_STRICT)
            .trim(),
        check('password')
            .isLength({ min: 6, max: 15 }).withMessage(WARNING.PASSWORD_LENGTH_STRICT)
            .trim()
    ],
};

module.exports = validate;