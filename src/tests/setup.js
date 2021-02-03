// const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
// const app = require('./../app');

let mongo = null;

// Run before all test code 
beforeAll(async () => {
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
