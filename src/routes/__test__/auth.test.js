const request = require('supertest');
const app = require('./../../app');

const { loginEndPoint } = global;

describe('Log In Feature', () => {
    it(`Has route handler for ${loginEndPoint}`, async () => {
        const response = await request(app).post(loginEndPoint).send({});
        expect(response.status).not.toBe(404);
    });

    it('Returns error if an invalid username is provided', async () => {
        await request(app)
            .post(loginEndPoint)
            .send({
                password: "123123"
            })
            .expect(400);

        await request(app)
            .post(loginEndPoint)
            .send({
                username: "",
                password: "123123"
            })
            .expect(400);

        await request(app)
            .post(loginEndPoint)
            .send({
                username: "!@#$@#$@%^",
                password: "123123"
            })
            .expect(400);
    });

    it('Returns error if an invalid password is provided', async () => {
        await request(app)
            .post(loginEndPoint)
            .send({
                username: "yasuo123",
            })
            .expect(400);

        await request(app)
            .post(loginEndPoint)
            .send({
                username: "yasuo123",
                password: "123"
            })
            .expect(400);

        await request(app)
            .post(loginEndPoint)
            .send({
                username: "yasuo123",
                password: "0129jr012j12podmpw1ompeo1mwzpokpewkofpwoekf"
            })
            .expect(400);
    });

    it('Returns 200 on login success', async () => {
        const response = await request(app)
            .post(loginEndPoint)
            .send({
                username: "yasuo123",
                password: "123123"
            });

        expect(response.status).toBe(200);
        expect(response.body.data.token).not.toBe('');
    });
});