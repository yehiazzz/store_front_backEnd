"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Users {
    async index() {
        try {
            const myConnection = await database_1.default.connect();
            const sql = `SELECT * FROM users`;
            const result = await myConnection.query(sql);
            myConnection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`can't get users ${err}`);
        }
    }
    async show(id) {
        try {
            const myConnection = await database_1.default.connect();
            const sql = `SELECT * FROM users WHERE id = ($1)`;
            const result = await myConnection.query(sql, [id]);
            myConnection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`can't get user ${err}`);
        }
    }
    async create(user) {
        try {
            const myConnection = await database_1.default.connect();
            const sql = `INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3)`;
            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = process.env.SALT_ROUND;
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
            const result = await myConnection.query(sql, [user.firstName, user.lastName, hash]);
            myConnection.release();
            return user;
        }
        catch (err) {
            throw new Error(`can't create user ${err}`);
        }
    }
    async authonticate(currentUSer) {
        const myConnection = await database_1.default.connect();
        const sql = `SELECT password_digest FROM users WHERE first_name = ($1) AND last_name = ($2)`;
        const result = await myConnection.query(sql, [currentUSer.firstName, currentUSer.lastName]);
        myConnection.release();
        const pepper = process.env.BCRYPT_PASSWORD;
        if (result.rows.length) {
            const verUser = result.rows[0];
            if (bcrypt_1.default.compareSync(currentUSer.password + pepper, verUser.password_digest))
                return verUser;
        }
        return null;
    }
}
exports.Users = Users;
