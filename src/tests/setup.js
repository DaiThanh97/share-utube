const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { ROUTES } = require('./../configs/constants');
const app = require('./../app');

let mongo = null;

global.movieEndPoint = ROUTES.MOVIE.PREFIX;
global.loginEndPoint = ROUTES.AUTH.PREFIX + ROUTES.AUTH.LOGIN;
global.shareEndPoint = ROUTES.MOVIE.PREFIX + ROUTES.MOVIE.SHARE;

// Run before all test code 
beforeAll(async () => {
    process.env.JWT_KEY = "testtest";
    process.env.JWT_EXPIRES = "30m";

    mongo = new MongoMemoryServer();
    const mongoURI = await mongo.getUri();

    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Run before each test start
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

// Global function
global.logIn = async () => {
    const username = "yasuo123";
    const password = "123123";

    const response = await request(app)
        .post(global.loginEndPoint)
        .send({
            username,
            password
        })
        .expect(200);

    const token = response.body.data.token;
    return token;
}