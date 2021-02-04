const Response = require('./../classes/Response');
const { STATUS_CODE, WARNING } = require('../configs/constants');
const asyncHandler = require('./../middlewares/async-handler');
const Movie = require('./../models/Movie');

// @DESC    GET LIST VIDEO YOUTUBE
// @ROUTE   GET /api/video
// @ACCESS  PUBLIC
exports.getMovies = asyncHandler(async (req, res, next) => {
    const movies = await Movie.find().populate('user');

    // Response
    res.status(STATUS_CODE.SUCCESS)
        .json(new Response(WARNING.GET_MOVIES_SUCCESS, movies));
});

// @DESC    SHARE VIDEO YOUTUBE
// @ROUTE   POST /api/video/share
// @ACCESS  PRIVATE
exports.share = asyncHandler(async (req, res, next) => {
    const { url } = req.body;

    const movie = new Movie({
        url,
        user: req.user.id
    })
    await movie.save();

    // Response
    res.status(STATUS_CODE.SUCCESS)
        .json(new Response(WARNING.SHARE_SUCCESS, {}));
});