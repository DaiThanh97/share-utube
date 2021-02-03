const { STATUS_CODE } = require("../configs/constants");

module.exports = (err, req, res, next) => {
    const { message, status, errors } = err;
    res.status(status || STATUS_CODE.INTERNAL_ERROR)
        .json({
            message,
            errors: errors ? errors : {}
        })
};