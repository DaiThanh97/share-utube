const { check } = require('express-validator');

const validate = {
    signUp: [
        check('username')
            .isLength({ min: 6, max: 15 }).withMessage("Username must between 6 and 15 characters!")
            .isAlphanumeric().withMessage("Username must not have special characters!")
            .trim(),
        check('password')
            .isLength({ min: 6, max: 15 }).withMessage("Password must between 6 and 15 characters!")
            .trim()
    ],
    logIn: [
        check('username')
            .isLength({ min: 6, max: 15 }).withMessage("Username must between 6 and 15 characters!")
            .isAlphanumeric().withMessage("Username must not have special characters!")
            .trim(),
        check('password')
            .isLength({ min: 6, max: 15 }).withMessage("Password must between 6 and 15 characters!")
            .trim()
    ],
};

module.exports = validate;