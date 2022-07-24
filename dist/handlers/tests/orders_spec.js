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
let token = '';
describe('test of orders routes', () => {
    // Test all orders by user
    it('should get all orders for user id', async () => {
        const newTestUser = new users_1.Users();
        const newUser = {
            firstName: "First Test Name1",
            lastName: 'last Test Name1',
            password: 'testpassword1'
        };
        const createNewUser = await request.post('/users')
            .send(newUser);
        token = jsonwebtoken_1.default.sign({ nUser: newUser }, process.env.TOKEN_SECRET);
        const response = await request.get('/orders/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        const { id, user_id, status } = response.body[0];
        expect(status).toBe('active');
    });
    it('should retutn error because no JWT', async () => {
        const response = await request.get('/orders/1');
        expect(response.status).toBe(401);
    });
    // Test completes order by user
    it('should get all completes orders for user id', async () => {
        const response = await request.get('/orders/2/complete')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        const { id, user_id, status } = response.body[1];
        expect(user_id).toBe(2);
    });
    it('should retutn error because no JWT', async () => {
        const response = await request.get('/orders/2/complete');
        expect(response.status).toBe(401);
    });
    // Test adding product to order
    it('should insert product into order id', async () => {
        const ProductID = 2;
        const qty = 555;
        const response = await request.post('/orders/1/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
            "productID": ProductID,
            "qty": qty
        });
        expect(response.status).toBe(200);
    });
    it('should retutn error because no JWT', async () => {
        const ProductID = 2;
        const qty = 555;
        const response = await request.post('/orders/1/products')
            .send({
            "productID": ProductID,
            "qty": qty
        });
        expect(response.status).toBe(401);
    });
});
