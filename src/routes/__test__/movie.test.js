const request = require('supertest');
const app = require('./../../app');

const { logIn, shareEndPoint } = global;
const token = logIn();
const urlYoutube = 'https://www.youtube.com/watch?v=HOCxJ0-KKos&t=1629s';

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
