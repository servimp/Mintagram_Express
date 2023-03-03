import 'reflect-metadata';
import { UserController } from "./controller/UserController"
import { PostController } from "./controller/PostController"
import { RefreshTokenController } from "./controller/RefreshTokenController";


export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
  }, 
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
  }, 
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
  }, 
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
  },
  {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
  },
  // existing routes for PostController
  {
    method: "get",
    route: "/posts",
    controller: PostController,
    action: "all"
  }, 
  {
    method: "get",
    route: "/posts/:id",
    controller: PostController,
    action: "one"
  }, 
  {
    method: "post",
    route: "/posts",
    controller: PostController,
    action: "save"
  }, 
  {
    method: "delete",
    route: "/posts/:id",
    controller: PostController,
    action: "remove"
  },
  // route for refreshing the token
  {
    method: "post",
    route: "/refresh-token",
    controller: RefreshTokenController,
    action: "refreshToken"
  }
];
