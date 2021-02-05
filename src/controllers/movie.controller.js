const Response = require('./../classes/Response');
const { STATUS_CODE, WARNING } = require('../configs/constants');
const asyncHandler = require('./../middlewares/async-handler');
const Movie = require('./../models/Movie');
const youtubeService = require('./../services/youtube.service');
const CustomError = require('../classes/CustomError');

// @DESC    GET LIST VIDEO YOUTUBE
// @ROUTE   GET /api/video
// @ACCESS  PUBLIC
exports.getMovies = asyncHandler(async (req, res, next) => {
    const page = +req.query.page || 1;
    const itemPerPage = +req.query.count || 4;

    const [totalMovie, movies] = await Promise.all([
        await Movie.estimatedDocumentCount(),
        await Movie.find()
            .populate('user')
            .skip(itemPerPage * (page - 1))
            .limit(itemPerPage)
            .sort({ sharedAt: -1 })
    ]);

    // Response
    res.status(STATUS_CODE.SUCCESS)
        .json(new Response(WARNING.GET_MOVIES_SUCCESS, { totalMovie, movies }));
});

// @DESC    SHARE VIDEO YOUTUBE
// @ROUTE   POST /api/video/share
// @ACCESS  PRIVATE
exports.share = asyncHandler(async (req, res, next) => {
    const { url } = req.body;

    // Get data from video
    const data = await youtubeService.getDataFromYoutube(url);
    if (!data) {
        throw new CustomError(STATUS_CODE.INTERNAL_ERROR, WARNING.SOMETHING_WRONG);
    }

    const movie = new Movie({
        url,
        ...data,
        user: req.user.id
    })
    await movie.save();

    // Response
    res.status(STATUS_CODE.SUCCESS)
        .json(new Response(WARNING.SHARE_SUCCESS, {}));
});