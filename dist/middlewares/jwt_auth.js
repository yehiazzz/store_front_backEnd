"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_authintacate = async (req, res, next) => {
    try {
        const headerAuth = req.headers.authorization;
        const token = headerAuth.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token: ${err}`);
        return;
    }
};
exports.default = jwt_authintacate;
