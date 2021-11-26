"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EventSchema = new mongoose_1.Schema({
    start: { type: Date, required: true },
    end: Date,
    duration: Number,
    title: { type: String, required: true },
    description: String,
    family: { type: mongoose_1.Schema.Types.ObjectId, ref: "Family" },
});
EventSchema.index({ family: 1 });
var User = mongoose_1.model("Event", EventSchema);
exports.default = User;
