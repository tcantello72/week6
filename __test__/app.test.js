const request = require('supertest');
const app = require('../src/app.js');
const User = require('../src/models/User.js');

jest.mock('../src/models/User.js', () => ({ create: jest.fn() }));

describe("User routes", () => {

    /*it('should retrieve all users', async () => {
        const response = await request(app).get('/users');
        expect(response.StatusCode).toBe(200);
        const parsedResponse = JSON.parse(response.text);
        expect(parsedResponse[0].username.toBe('user1'));
    });  */

    it('should create a user', async () => {
        User.create.mockResolvedValue({'username' : 'testToby', 'email' : 'email@email.com', 'password' : '123456'});
        const response = await request(app).post('/users').send({'username' : 'testToby', 'email' : 'email@email.com', 'password' : '123456'});
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('testToby');
        expect(User.create).toHaveBeenCalledWith({'username' : 'testToby', 'email' : 'email@email.com', 'password' : '123456'});
    });
});