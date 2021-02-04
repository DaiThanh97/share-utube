const { check } = require('express-validator');
const { WARNING } = require('./../configs/constants');

const validate = {
    share: [
        check('url')
            .matches(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm)
            .withMessage(WARNING.URL_INVALID)
            .trim()
    ]
};

module.exports = validate;