"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store_users = void 0;
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_auth_1 = __importDefault(require("../middlewares/jwt_auth"));
dotenv_1.default.config();
exports.store_users = new users_1.Users();
const index = async (req, res) => {
    try {
        const users = await exports.store_users.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const users = await exports.store_users.show(req.params.id);
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const userCreate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    };
    try {
        const newUsers = await exports.store_users.create(userCreate);
        var token = jsonwebtoken_1.default.sign({ nUser: newUsers }, process.env.TOKEN_SECRET);
        res.json({ "token": token });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userStore = (app) => {
    app.get('/users', jwt_auth_1.default, index);
    app.get('/users/:id', jwt_auth_1.default, show);
    app.post('/users', create);
};
exports.default = userStore;
