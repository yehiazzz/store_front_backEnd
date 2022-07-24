"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = __importDefault(require("../database"));
class Product {
    async index() {
        try {
            const myConnection = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await myConnection.query(sql);
            myConnection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`can't get products ${err}`);
        }
    }
    async show(id) {
        try {
            const myConnection = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE id= ($1)`;
            const result = await myConnection.query(sql, [id]);
            myConnection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`can't get product ${err}`);
        }
    }
    async create(product) {
        try {
            const myConnection = await database_1.default.connect();
            const sql = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3)`;
            const result = await myConnection.query(sql, [product.name, product.price, product.category]);
            myConnection.release();
            return product;
        }
        catch (err) {
            throw new Error(`can't create product ${err}`);
        }
    }
}
exports.Product = Product;
