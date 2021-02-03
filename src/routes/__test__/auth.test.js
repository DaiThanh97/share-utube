const request = require('supertest');
const app = require('./../../app');

const prefix = `${global.prefix}/auth`;
const signUpEndPoint = `${prefix}/signUp`
const loginEndpoint = `${prefix}/logIn`;

const createUser = () => {
    return request(app)
        .post(signUpEndPoint)
        .send({
            username: "yasuo123",
            password: "123123"
        })
        .expect(201);
}

describe('Sign Up Feature', () => {
    it(`Has route handler for ${signUpEndPoint}`, async () => {
        const response = await request(app).post(signUpEndPoint).send({});
        expect(response.status).not.toBe(404);
    });

    it('Returns error if an invalid username is provided', async () => {
        await request(app)
            .post(signUpEndPoint)
            .send({
                password: "123123"
            })
            .expect(400);

        await request(app)
            .post(signUpEndPoint)
            .send({
                username: "",
                password: "123123"
            })
            .expect(400);

        await request(app)
            .post(signUpEndPoint)
            .send({
                username: "!@#$@#$@%^",
                password: "123123"
            })
            .expect(400);
    });

    it('Returns error if an invalid password is provided', async () => {
        await request(app)
            .post(signUpEndPoint)
            .send({
                username: "yasuo123",
            })
            .expect(400);

        await request(app)
            .post(signUpEndPoint)
            .send({
                username: "yasuo123",
                password: "123"
            })
            .expect(400);

        await request(app)
            .post(signUpEndPoint)
            .send({
                username: "yasuo123",
                password: "0129jr012j12podmpw1ompeo1mwzpokpewkofpwoekf"
            })
            .expect(400);
    });

    it('Create User and return token with valid inputs', async () => {
        const response = await request(app)
            .post(signUpEndPoint)
            .send({
                username: "yasuo123",
                password: "123123"
            })
            .expect(201);

        expect(response.body.data.token).not.toBe('');
    });
});

describe('Log In Feature', () => {
    it(`Has route handler for ${loginEndpoint}`, async () => {
        const response = await request(app).post(loginEndpoint).send({});
        expect(response.status).not.toBe(404);
    });

    it('Returns error if an invalid username is provided', async () => {
        await request(app)
            .post(loginEndpoint)
            .send({
                password: "123123"
            })
            .expect(400);

        await request(app)
            .post(loginEndpoint)
            .send({
                username: "",
                password: "123123"
            })
            .expect(400);

        await request(app)
            .post(loginEndpoint)
            .send({
                username: "!@#$@#$@%^",
                password: "123123"
            })
            .expect(400);
    });

    it('Returns error if an invalid password is provided', async () => {
        await request(app)
            .post(loginEndpoint)
            .send({
                username: "yasuo123",
            })
            .expect(400);

        await request(app)
            .post(loginEndpoint)
            .send({
                username: "yasuo123",
                password: "123"
            })
            .expect(400);

        await request(app)
            .post(loginEndpoint)
            .send({
                username: "yasuo123",
                password: "0129jr012j12podmpw1ompeo1mwzpokpewkofpwoekf"
            })
            .expect(400);
    });

    it('Returns 400 if user is not signUp', async () => {
        await request(app)
            .post(loginEndpoint)
            .send({
                username: "yasuo123",
                password: "123123"
            })
            .expect(400);
    })

    it('Returns 200 on get login success', async () => {
        await createUser();

        const response = await request(app)
            .post(loginEndpoint)
            .send({
                username: "yasuo123",
                password: "123123"
            })
            .expect(200);

        expect(response.body.data.token).not.toBe('');
    });
});