"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var families_1 = __importDefault(require("./families"));
var tools_1 = __importDefault(require("./tools"));
var route = express_1.Router();
route.use("/tools", tools_1.default);
route.use("/families", families_1.default);
exports.default = route;
