"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Post_1 = require("./entity/Post");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "containers-us-west-96.railway.app",
    port: 6454,
    username: "postgres",
    password: "nsl6w0CIuLAFnEor6Tei",
    database: "railway",
    synchronize: true,
    logging: false,
    entities: [Post_1.Post, User_1.User],
    migrations: ["build/migration/**/*.js"],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map