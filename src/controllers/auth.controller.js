const CustomError = require('../classes/CustomError');
const Response = require('./../classes/Response');
const { STATUS_CODE, WARNING } = require('../configs/constants');
const asyncHandler = require('./../middlewares/async-handler');
const passwordService = require('./../services/password.service');
const jwtService = require('./../services/jwt.service');
const User = require('./../models/User');

// @DESC    LOGIN USER
// @ROUTE   POST /api/auth/logIn
// @ACCESS  PUBLIC
exports.logIn = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    // Check existed user with username
    let user = await User.findOne({ username });
    if (!user) {
        // Sign Up User
        // Hash password
        const passwordHash = await passwordService.hash(password);
        user = new User({
            username,
            password: passwordHash
        });
        await user.save();
    }
    else {
        // Check password
        const isValidPassword = await passwordService.isEqual(password, user.password);
        if (!isValidPassword) {
            throw new CustomError(STATUS_CODE.BAD_REQUEST, WARNING.INVALID_CREDENTIAL);
        }
    }

    // Generate JWT
    const token = jwtService.sign({
        id: user.id
    });

    // Response
    res.status(STATUS_CODE.SUCCESS)
        .json(new Response(WARNING.LOGIN_SUCCESS, {
            token,
            username
        }));
});