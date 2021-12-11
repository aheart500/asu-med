"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = __importDefault(require("./families/index"));
var tools_1 = __importDefault(require("./tools"));
var route = express_1.Router();
var handleReqMiddleware = function (req, res, next) {
    console.log(req.method + " " + req.url + " ", req.body);
    next();
};
route.use(handleReqMiddleware);
route.use("/tools", tools_1.default);
route.use("/families", index_1.default);
exports.default = route;
