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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
var data_source_1 = require("../data-source");
var Post_1 = require("../entity/Post");
var jsonwebtoken_1 = require("jsonwebtoken");
var PostController = /** @class */ (function () {
    function PostController() {
        this.postRepository = data_source_1.AppDataSource.getRepository(Post_1.Post);
    }
    PostController.prototype.all = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, skip, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = parseInt(request.query.page || '1');
                        limit = parseInt(request.query.limit || '2');
                        skip = (page - 1) * limit;
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Post_1.Post).find({
                                take: limit,
                                skip: skip,
                                relations: ["user"]
                            })];
                    case 1:
                        posts = _a.sent();
                        response.send(posts);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.one = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = parseInt(request.params.id);
                        return [4 /*yield*/, this.postRepository.findOne({
                                where: { id: id },
                                relations: ["user"]
                            })];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            return [2 /*return*/, "unregistered post"];
                        }
                        return [2 /*return*/, post];
                }
            });
        });
    };
    PostController.prototype.save = function (request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, title, creationDate, imgUrl, imgFilter, idUser, accessToken, decoded, post, savedPost, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = request.body, title = _b.title, creationDate = _b.creationDate, imgUrl = _b.imgUrl, imgFilter = _b.imgFilter, idUser = _b.idUser;
                        accessToken = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        decoded = (0, jsonwebtoken_1.verify)(accessToken, process.env.ACCESS_TOKEN_SECRET);
                        post = Object.assign(new Post_1.Post(), {
                            title: title,
                            creationDate: creationDate,
                            imgUrl: imgUrl,
                            imgFilter: imgFilter,
                            idUser: idUser
                        });
                        // Set the user property of the post to the username from the decoded JWT payload
                        post.user = decoded.username;
                        return [4 /*yield*/, this.postRepository.save(post)];
                    case 2:
                        savedPost = _c.sent();
                        response.send(savedPost);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        console.log(err_1);
                        response.status(401).send('Unauthorized');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.remove = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, postToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = parseInt(request.params.id);
                        return [4 /*yield*/, this.postRepository.findOneBy({ id: id })];
                    case 1:
                        postToRemove = _a.sent();
                        if (!postToRemove) {
                            return [2 /*return*/, "this post not exist"];
                        }
                        return [4 /*yield*/, this.postRepository.remove(postToRemove)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "post has been removed"];
                }
            });
        });
    };
    return PostController;
}());
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map