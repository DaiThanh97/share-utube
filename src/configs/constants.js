exports.STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHENTICATED: 401,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

const PREFIX = '/api';
exports.ROUTES = {
    AUTH: {
        PREFIX: PREFIX + '/auth',
        SIGN_UP: '/signUp',
        LOGIN: '/logIn',
    },
    MOVIE: {
        PREFIX: PREFIX + '/movie',
        SHARE: '/share',
    }
};
