"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../../models/users");
const request = (0, supertest_1.default)(server_1.default);
describe('tests of product routes', () => {
    const newProduct = {
        name: 'testProdcut',
        price: 105,
        category: 'testCategory'
    };
    // Test index route
    it('Should return all products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
        const { id, name, price, category } = response.body[1];
        expect(name).toBe('laptop');
    });
    // Test show product by id route
    it('Should return all products', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
        const { id, name, price, category } = response.body;
        expect(name).toBe('Camera');
    });
    // Test Create product
    it('Should return all products', async () => {
        const newTestUser = new users_1.Users();
        const newUser = {
            firstName: "First Test Name1",
            lastName: 'last Test Name1',
            password: 'testpassword1'
        };
        const createNewUser = await request.post('/users')
            .send(newUser);
        const token = jsonwebtoken_1.default.sign({ nUser: newUser }, process.env.TOKEN_SECRET);
        const response = await request.post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send(newProduct);
        expect(response.status).toBe(200);
    });
    it('Should return status error because there is no jwt', async () => {
        const response = await request.post('/products')
            .send(newProduct);
        expect(response.status).toBe(401);
    });
});
