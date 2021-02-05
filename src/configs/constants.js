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
        LOGIN: '/logIn',
    },
    MOVIE: {
        PREFIX: PREFIX + '/movie',
        SHARE: '/share',
    }
};

exports.WARNING = {
    INVALID_INPUT: 'Invalid input!',
    NOT_AUTHENTICATED: 'Not Authenticated!',
    NOT_FOUND: 'Not Found!',
    USER_ALREADY_USED: 'Username is already in use!',
    INVALID_CREDENTIAL: 'Invalid credentials!',
    LOGIN_SUCCESS: 'Log in successful!',
    GET_MOVIES_SUCCESS: 'Get movies successful!',
    SHARE_SUCCESS: 'Share successful!',
    USERNAME_LENGTH_STRICT: 'Username must between 6 and 15 characters!',
    USERNAME_SPECIAL_STRICT: 'Username must not have special characters!',
    PASSWORD_LENGTH_STRICT: 'Password must between 6 and 15 characters!',
    URL_INVALID: 'Invalid youtube url!',
    SOMETHING_WRONG: 'Something went wrong!'
}

exports.COLLECTION_NAME = {
    USER: 'User',
    MOVIE: 'Movie',
}