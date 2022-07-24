"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const testUProduct = new products_1.Product();
describe('Product Model', () => {
    describe('Index method', () => {
        it('should be there', () => {
            expect(testUProduct.index).toBeDefined;
        });
        it('should equal to followng values', async () => {
            const result = await testUProduct.index();
            expect(result[0].name == 'camera').toBeTrue;
            expect(result[2].category == null).toBeTrue;
            expect(result[4].price).toEqual(27);
        });
    });
    describe('Show method', () => {
        it('should be there', () => {
            expect(testUProduct.show).toBeDefined;
        });
        it('should equal to followng values', async () => {
            const result = await testUProduct.show(5);
            expect(result.category == 'toys').toBeTrue;
            expect(result.name == 'doll').toBeTrue;
        });
    });
    describe('Create method', () => {
        it('should be there', () => {
            expect(testUProduct.create).toBeDefined;
        });
        it('should create row', async () => {
            const newUser = {
                name: 'user1',
                price: 123
            };
            const result = await testUProduct.create(newUser);
            expect(result.price).toEqual(123);
        });
    });
});
