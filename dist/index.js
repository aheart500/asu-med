"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var routes_1 = __importDefault(require("./routes"));
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("./utils/config");
// Server Initialization
var dev = process.env.NODE_ENV !== "production";
var nextApp = next_1.default({ dev: dev });
var handle = nextApp.getRequestHandler();
var app = express_1.default();
nextApp
    .prepare()
    .then(function () {
    mongoose_1.default
        .connect(config_1.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
        .then(function () { return console.log("MongoDB connected successfully"); })
        .catch(function (err) { return console.log(err); });
    app.use(express_1.default.json());
    app.use("/api", routes_1.default);
    app.all("*", function (req, res) {
        return handle(req, res);
    });
    app.listen(config_1.PORT, function () {
        console.log("App ready on port " + config_1.PORT);
    });
})
    .catch(function (exception) {
    console.error(exception.stack);
    process.exit(1);
});
