"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
require("reflect-metadata");
var UserController_1 = require("./controller/UserController");
var PostController_1 = require("./controller/PostController");
var RefreshTokenController_1 = require("./controller/RefreshTokenController");
exports.Routes = [
    {
        method: "get",
        route: "/users",
        controller: UserController_1.UserController,
        action: "all"
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "one"
    },
    {
        method: "post",
        route: "/users",
        controller: UserController_1.UserController,
        action: "save"
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "remove"
    },
    {
        method: "post",
        route: "/login",
        controller: UserController_1.UserController,
        action: "login"
    },
    // existing routes for PostController
    {
        method: "get",
        route: "/posts",
        controller: PostController_1.PostController,
        action: "all"
    },
    {
        method: "get",
        route: "/posts/:id",
        controller: PostController_1.PostController,
        action: "one"
    },
    {
        method: "post",
        route: "/posts",
        controller: PostController_1.PostController,
        action: "save"
    },
    {
        method: "delete",
        route: "/posts/:id",
        controller: PostController_1.PostController,
        action: "remove"
    },
    // route for refreshing the token
    {
        method: "post",
        route: "/refresh-token",
        controller: RefreshTokenController_1.RefreshTokenController,
        action: "refreshToken"
    }
];
//# sourceMappingURL=routes.js.map