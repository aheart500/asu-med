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
var Book_1 = __importDefault(require("../../models/Book"));
var BookFairsRouter = express_1.Router();
BookFairsRouter.get("/", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book_1.default.find({}).select("title genre number").lean()];
            case 1:
                books = _a.sent();
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(400).send(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
BookFairsRouter.get("/unlisted", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book_1.default.find({ genre: "" })
                        .select("title genre number")
                        .lean()];
            case 1:
                books = _a.sent();
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(400).send(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
BookFairsRouter.get("/custom", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book_1.default.updateMany({ genre: { $in: ["short Stories", "Novels"] } }, { $set: { genre: "Literature" } }, { new: true })];
            case 1:
                books = _a.sent();
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(400).send(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
BookFairsRouter.get("/:genre", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book_1.default.find({
                        genre: { $regex: new RegExp(req.params.genre, "i") },
                    })
                        .select("title genre number")
                        .lean()];
            case 1:
                books = _a.sent();
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(400).send(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// For many books with titles only : Send req as {bulk: true, books: "book1, book2" }
// For single book : Sent req as {bulk : false, book : BOOK}
BookFairsRouter.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isBulk, books, insertedBooks, book, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isBulk = req.body.bulk === true;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!isBulk) return [3 /*break*/, 3];
                books = req.body.books.title
                    .split("\n")
                    .filter(function (book) { return book !== ""; })
                    .map(function (book) { return ({
                    title: book.trim(),
                    genre: req.body.books.genre,
                    number: req.body.books.number,
                }); });
                return [4 /*yield*/, Book_1.default.insertMany(books)];
            case 2:
                insertedBooks = _a.sent();
                res.send(insertedBooks);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, Book_1.default.create(req.body.book)];
            case 4:
                book = _a.sent();
                res.send(book);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_5 = _a.sent();
                res.status(400).send(e_5);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
BookFairsRouter.patch("/:bookId", function (req, res) {
    Book_1.default.findByIdAndUpdate(req.params.bookId, { $set: req.body }, { new: true })
        .then(function (book) {
        res.send(book);
    })
        .catch(function (e) {
        res.status(400).send(e);
    });
});
BookFairsRouter.delete("/:bookId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book_1.default.deleteOne({ _id: req.params.bookId })];
            case 1:
                _a.sent();
                res.send("Deleted");
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.status(400).send(e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = BookFairsRouter;
