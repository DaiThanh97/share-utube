const CustomError = require('../classes/CustomError');
const Response = require('./../classes/Response');
const { STATUS_CODE } = require('../configs/constants');
const asyncHandler = require('./../middlewares/async-handler');
const passwordService = require('./../services/password.service');
const jwtService = require('./../services/jwt.service');
const User = require('./../models/User');

// @DESC    SIGN UP USER
// @ROUTE   POST /api/auth/signUp
// @ACCESS  PUBLIC
exports.signUp = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    // Check existed user with username
    let user = await User.findOne({ username });
    if (user) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, "Username is already in use!");
    }

    // Handle logic
    // Hash password
    const passwordHash = await passwordService.hash(password);
    user = new User({
        username,
        password: passwordHash
    });
    await user.save();

    // Generate JWT
    const token = jwtService.sign({
        id: user.id
    });

    // Response
    res.status(STATUS_CODE.CREATED)
        .json(new Response("Sign up successful!", { token }));
});

// @DESC    LOGIN USER
// @ROUTE   POST /api/auth/logIn
// @ACCESS  PUBLIC
exports.logIn = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    // Check existed user with username
    let user = await User.findOne({ username });
    if (!user) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, "Invalid credentials!");
    }

    // Handle logic
    // Check password
    const isValidPassword = await passwordService.isEqual(password, user.password);
    if (!isValidPassword) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, "Invalid credentials!");
    }

    // Generate JWT
    const token = jwtService.sign({
        id: user.id
    });

    // Response
    res.status(STATUS_CODE.SUCCESS)
        .json(new Response("Log in successful!", {
            token,
            username
        }));
});