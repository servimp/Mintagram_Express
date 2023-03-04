"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Post_1 = require("./entity/Post");
var migrations;
var host;
var port;
var username;
var password;
var database;
if (process.env.NODE_ENV === 'production') {
    migrations = ["build/migration/**/*.js"];
    host = "containers-us-west-96.railway.app";
    port = 6454;
    username = "postgres";
    password = "nsl6w0CIuLAFnEor6Tei";
    database = "railway";
}
else {
    migrations = ["src/migration/**/*.ts"];
    host = "localhost";
    port = 5432;
    username = "postgres";
    password = "MtDbPass";
    database = "postgres";
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [Post_1.Post, User_1.User],
    migrations: migrations,
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map