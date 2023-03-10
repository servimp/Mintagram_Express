"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var data_source_1 = require("./data-source");
var routes_1 = require("./routes");
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// rest of your code here
data_source_1.AppDataSource.initialize();
// create express app
var app = (0, express_1.default)();
var port = process.env.PORT || 5000;
// enable CORS
app.use((0, cors_1.default)({
    origin: ['https://mintagramreact-production.up.railway.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(bodyParser.json());
// Use cookie-parser middleware
app.use((0, cookie_parser_1.default)());
// register express routes from defined application routes
routes_1.Routes.forEach(function (route) {
    app[route.method](route.route, function (req, res, next) {
        var result = (new route.controller)[route.action](req, res, next);
        if (result instanceof Promise) {
            result.then(function (result) { return result !== null && result !== undefined ? res.send(result) : undefined; });
        }
        else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});
app.listen(port, function () {
    console.log('testing other logs on start-up');
    console.log("Express server has started on port: ".concat(port, "."));
});
//# sourceMappingURL=index.js.map