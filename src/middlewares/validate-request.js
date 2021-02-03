const { validationResult } = require('express-validator');
const { STATUS_CODE } = require('../configs/constants');
const CustomError = require('./../classes/CustomError');

module.exports = (req, res, next) => {
    let { errors } = validationResult(req);
    if (errors.length > 0) {
        errors = errors.map(err => ({ message: err.msg, field: err.param }));
        const customError = new CustomError(STATUS_CODE.BAD_REQUEST, 'Invalid input!', errors);
        return next(customError);
    }
    next();
}