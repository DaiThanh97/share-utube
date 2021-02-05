const { check } = require('express-validator');
const { WARNING } = require('./../configs/constants');

const validate = {
    share: [
        check('url')
            .matches(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/)
            .withMessage(WARNING.URL_INVALID)
            .trim()
    ]
};

module.exports = validate;