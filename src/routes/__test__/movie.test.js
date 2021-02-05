const request = require('supertest');
const app = require('./../../app');

const { logIn, shareEndPoint, movieEndPoint } = global;
const token = logIn();
const urlYoutube = 'https://www.youtube.com/watch?v=HOCxJ0-KKos';

describe('Get Movies Feature', () => {
    it(`Has route handler for ${movieEndPoint}`, async () => {
        const response = await request(app)
            .get(`${movieEndPoint}?page=1&count=4`)
            .send({});

        expect(response.status).not.toBe(404);
    });
});

describe('Share Feature', () => {
    it(`Has route handler for ${shareEndPoint}`, async () => {
        const response = await request(app).post(shareEndPoint).send({});
        expect(response.status).not.toBe(404);
    });

    it('Return 400 if provide invalid input', async () => {
        await request(app)
            .post(shareEndPoint)
            .set('Authorization', 'Bearer ' + await token)
            .send({
                url: "lekmfeofmpeojsfpsf"
            })
            .expect(400);
    });

    it('Return 401 if not authenticated', async () => {
        await request(app)
            .post(shareEndPoint)
            .send({
                url: urlYoutube
            })
            .expect(401);
    });

    it('Return 200 if provide valid input', async () => {
        await request(app)
            .post(shareEndPoint)
            .set('Authorization', 'Bearer ' + await token)
            .send({
                url: urlYoutube
            })
            .expect(200);
    });
});
