const { STATUS_CODE } = require('../configs/constants');
const jwtService = require('./../services/jwt.service');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        token = token.replace('Bearer ', '');
        if (!token || token === '') {
            throw new Error();
        }

        const payload = jwtService.verify(token);
        if (!payload) {
            throw new Error();
        }

        req.user = payload;
        next();
    } catch (err) {
        err.message = "Not Authenticated!";
        err.status = STATUS_CODE.UNAUTHENTICATED;
        next(err);
    }
}