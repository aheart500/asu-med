"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var FamilySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    events: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Event" }],
});
var User = mongoose_1.model("Family", FamilySchema);
exports.default = User;
