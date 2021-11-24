"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.MONGODB_URI = exports.PORT = void 0;
require("dotenv/config");
var dev = true;
exports.PORT = process.env.PORT || 3000;
exports.MONGODB_URI = dev
    ? "mongodb://localhost:27017/asu-med"
    : process.env.MONGODB_URI;
exports.SECRET = process.env.SECRET || "SECRET";
