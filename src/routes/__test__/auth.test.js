const request = require('supertest');
const { subscribe } = require('./../../app');
const app = require('./../../app');

describe('Sign Up Feature', () => {
    it('Has route handler for /api/auth/signUp', async () => {
        const response = await request(app).post('/api/auth/signUp').send({});
        expect(response.status).not.toBe(404);
    });

    it('Returns error if an invalid username is provided', async () => {
        await request(app)
            .post('/api/auth/signUp')
            .send({
                password: "123123"
            })
            .expect(400);

        await request(app)
            .post('/api/auth/signUp')
            .send({
                username: "",
                password: "123123"
            })
            .expect(400);

        await request(app)
            .post('/api/auth/signUp')
            .send({
                username: "!@#$@#$@%^",
                password: "123123"
            })
            .expect(400);
    });

    it('Returns error if an invalid password is provided', async () => {
        await request(app)
            .post('/api/auth/signUp')
            .send({
                username: "yasuo123",
            })
            .expect(400);

        await request(app)
            .post('/api/auth/signUp')
            .send({
                username: "yasuo123",
                password: "123"
            })
            .expect(400);

        await request(app)
            .post('/api/auth/signUp')
            .send({
                username: "yasuo123",
                password: "0129jr012j12podmpw1ompeo1mwzpokpewkofpwoekf"
            })
            .expect(400);
    });

    it('Create User and return token with valid inputs', async () => {
        const response = await request(app)
            .post('/api/auth/signUp')
            .send({
                username: "yasuo123",
                password: "123123"
            })
            .expect(201);

        expect(response.body.data.token).not.toBe('');
    });
});