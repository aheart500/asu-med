"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    genre: { type: String, default: "" },
});
var Book = mongoose_1.model("Book", BookSchema);
exports.default = Book;
