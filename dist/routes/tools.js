"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Student_1 = __importDefault(require("../models/Student"));
var ToolsRouter = express_1.Router();
ToolsRouter.post("/rank", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, password, user_1, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, password = _a.password;
                if (!id || !password) {
                    res.send({ error: true, message: "No ID or password provided" });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Student_1.default.findOne({ id: id }).select("password grades")];
            case 2:
                user_1 = _b.sent();
                if (!!user_1) return [3 /*break*/, 3];
                res.send({ error: true, message: "This ID isn't registered yet!" });
                return [2 /*return*/];
            case 3: return [4 /*yield*/, user_1.matchesPassword(password)];
            case 4:
                if (!(_b.sent())) {
                    res.send({ error: true, message: "Wrong password" });
                    return [2 /*return*/];
                }
                else {
                    Student_1.default.find({})
                        .sort("-grades")
                        .select("id grades")
                        .then(function (studentsGrades) {
                        var empStudents = 0;
                        var mainstreamStudents = 0;
                        studentsGrades.forEach(function (s) {
                            return s.id.toString().length === 5 ? empStudents++ : mainstreamStudents++;
                        });
                        var studentsWithoutSmiliarGrades = studentsGrades.filter(function (s) {
                            return s.grades === user_1.grades
                                ? s.id === parseInt(id)
                                    ? true
                                    : false
                                : true;
                        });
                        res.send({
                            error: false,
                            rank: studentsWithoutSmiliarGrades.findIndex(function (s) { return s.id === parseInt(id); }) + 1,
                            rankAmongGroup: studentsWithoutSmiliarGrades
                                .filter(function (s) {
                                return id.length === 5
                                    ? s.id.toString().length === 5
                                    : s.id.toString().length === 6;
                            })
                                .findIndex(function (s) { return s.id === parseInt(id); }) + 1,
                            empStudents: empStudents,
                            mainstreamStudents: mainstreamStudents,
                            total: empStudents + mainstreamStudents,
                        });
                    });
                }
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _b.sent();
                console.log(e_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
ToolsRouter.post("/student", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, password, grades, user, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, password = _a.password, grades = _a.grades;
                if (!id || !password || !grades) {
                    res.send({ error: true, message: "No ID, password or grades provided" });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Student_1.default.findOne({ id: id }).select("password")];
            case 2:
                user = _b.sent();
                if (user) {
                    res.send({ error: true, message: "This ID is already registered!" });
                    return [2 /*return*/];
                }
                else {
                    Student_1.default.create({ id: id, password: password, grades: grades })
                        .then(function () {
                        Student_1.default.find({})
                            .sort("-grades")
                            .select("id grades")
                            .then(function (studentsGrades) {
                            var empStudents = 0;
                            var mainstreamStudents = 0;
                            studentsGrades.forEach(function (s) {
                                return s.id.toString().length === 5
                                    ? empStudents++
                                    : mainstreamStudents++;
                            });
                            var studentsWithoutSmiliarGrades = studentsGrades.filter(function (s) {
                                return s.grades === grades
                                    ? s.id === parseInt(id)
                                        ? true
                                        : false
                                    : true;
                            });
                            res.send({
                                error: false,
                                rank: studentsWithoutSmiliarGrades.findIndex(function (s) { return s.id === parseInt(id); }) + 1,
                                rankAmongGroup: studentsWithoutSmiliarGrades
                                    .filter(function (s) {
                                    return id.length === 5
                                        ? s.id.toString().length === 5
                                        : s.id.toString().length === 6;
                                })
                                    .findIndex(function (s) { return s.id === parseInt(id); }) + 1,
                                empStudents: empStudents,
                                mainstreamStudents: mainstreamStudents,
                                total: empStudents + mainstreamStudents,
                            });
                        });
                    })
                        .catch(function (e) { return console.log(e); });
                }
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                console.log(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = ToolsRouter;