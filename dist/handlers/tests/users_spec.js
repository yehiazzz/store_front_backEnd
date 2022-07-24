"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const newTestUser = new Users();
const request = (0, supertest_1.default)(server_1.default);
let token = '';
// let user_id = ''
// const testUserHandler =  store_users
describe('test of users routes', () => {
    const newUser = {
        firstName: "First Test Name1",
        lastName: 'last Test Name1',
        password: 'testpassword1'
    };
    //Test Create Route
    it('creat method should return token', async () => {
        const response = await request.post('/users')
            .send(newUser);
        token = jsonwebtoken_1.default.sign({ nUser: newUser }, process.env.TOKEN_SECRET);
        expect(response.status).toBe(200);
    });
    // Test Index Route
    it('Should get all users', async () => {
        const response = await request.get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('Should show wrong status if the is no JWT', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    });
    // Test Show id Route
    it('Should should return user with id 1', async () => {
        const response = await request.get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
