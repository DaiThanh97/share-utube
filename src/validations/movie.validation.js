const { check } = require('express-validator');

const validate = {
    share: [
        check('url', 'Invalid youtube url')
            .isURL()
            .matches(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm)
            .trim()
    ]
};

module.exports = validate;