"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var StudentSchema = new mongoose_1.Schema({
    id: Number,
    grades: Number,
    password: String,
});
StudentSchema.index({ grades: 1 });
StudentSchema.methods.matchesPassword = function (password) {
    return password === this.password;
};
var User = mongoose_1.model("Student", StudentSchema);
exports.default = User;
