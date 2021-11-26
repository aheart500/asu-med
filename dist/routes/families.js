"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Family_1 = __importDefault(require("../models/Family"));
var Event_1 = __importDefault(require("../models/Event"));
var FamiliesRouter = express_1.Router();
FamiliesRouter.get("/:familyname", function (req, res) {
    var findByFamilyName = req.params.familyname;
    Family_1.default.find(findByFamilyName ? { name: findByFamilyName } : {})
        .then(function (families) { return res.send(families); })
        .catch(function (e) {
        res.status(400).send("Error Finding Family");
    });
});
FamiliesRouter.post("/", function (req, res) {
    Family_1.default.create({ name: req.body.name })
        .then(function (family) {
        res.send(family);
    })
        .catch(function (e) {
        res.status(400).send(e);
    });
});
FamiliesRouter.delete("/:familyId", function (req, res) {
    Family_1.default.deleteOne({ _id: req.params.familyId })
        .then(function (result) { return res.send(result); })
        .catch(function (e) {
        res.status(400).send("Error Deleting Family");
    });
});
FamiliesRouter.get("/events/:familyname", function (req, res) {
    Family_1.default.findOne({ name: req.params.familyname })
        .populate("events")
        .exec()
        .then(function (family) {
        res.send(family.events);
    })
        .catch(function (e) {
        res.status(400).send("Error Finding Family");
    });
});
FamiliesRouter.post("/events/:familyid", function (req, res) {
    Event_1.default.create(__assign(__assign({}, req.body), { family: req.params.familyid }))
        .then(function (event) {
        Family_1.default.findById(req.params.familyid).then(function (f) {
            f.events.push(event._id);
            f.save();
        });
        res.send(event);
    })
        .catch(function (e) {
        res.status(400).send("Error Saving Event");
    });
});
FamiliesRouter.patch("/events/:eventId", function (req, res) {
    Event_1.default.findByIdAndUpdate(req.params.eventId, { $set: req.body }, { new: true })
        .then(function (event) {
        res.send(event);
    })
        .catch(function (e) {
        res.status(400).send(e);
    });
});
FamiliesRouter.delete("/events/:eventId", function (req, res) {
    Event_1.default.deleteOne({ _id: req.params.eventId })
        .then(function (result) { return res.send(result); })
        .catch(function (e) {
        res.status(400).send("Error Deleting Event");
    });
});
exports.default = FamiliesRouter;
