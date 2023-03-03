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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersPosts1677812183801 = void 0;
var User_1 = require("../entity/User");
var Post_1 = require("../entity/Post");
var bcrypt_1 = require("bcrypt");
var usersPosts1677812183801 = /** @class */ (function () {
    function usersPosts1677812183801() {
        this.name = 'usersPosts1677812183801';
    }
    usersPosts1677812183801.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, postRepository, saltRounds, passUser1, passUser2, now, oneDayFromNow, user1, user2, post1, post2, post3, post4, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"post\" (\"id\" SERIAL NOT NULL, \"title\" text NOT NULL, \"creationDate\" TIMESTAMP NOT NULL DEFAULT now(), \"imgUrl\" text NOT NULL, \"imgFilter\" text NOT NULL, \"idUser\" integer NOT NULL, CONSTRAINT \"PK_be5fda3aac270b134ff9c21cdee\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"user\" (\"id\" SERIAL NOT NULL, \"username\" text NOT NULL, \"firstname\" text NOT NULL, \"lastname\" text NOT NULL, \"password\" text NOT NULL, \"rtoken\" text NOT NULL, \"tokenExpiresAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"post\" ADD CONSTRAINT \"FK_b19d2120615494c3f8c64dc338c\" FOREIGN KEY (\"idUser\") REFERENCES \"user\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 3:
                        _a.sent();
                        userRepository = queryRunner.manager.getRepository(User_1.User);
                        postRepository = queryRunner.manager.getRepository(Post_1.Post);
                        saltRounds = 10;
                        passUser1 = "12345";
                        passUser2 = "67890";
                        return [4 /*yield*/, (0, bcrypt_1.hash)(passUser1, saltRounds)];
                    case 4:
                        passUser1 = _a.sent();
                        return [4 /*yield*/, (0, bcrypt_1.hash)(passUser2, saltRounds)];
                    case 5:
                        passUser2 = _a.sent();
                        now = Date.now();
                        oneDayFromNow = now + 24 * 60 * 60 * 1000;
                        user1 = userRepository.create({
                            firstname: "Timber",
                            lastname: "Saw",
                            username: "@timbr",
                            password: passUser1,
                            rtoken: 'refresh-token-1',
                            tokenExpiresAt: new Date(oneDayFromNow)
                        });
                        user2 = userRepository.create({
                            firstname: "Phantom",
                            lastname: "Assassin",
                            username: "@Phant",
                            password: passUser2,
                            rtoken: 'refresh-token-2',
                            tokenExpiresAt: new Date(oneDayFromNow)
                        });
                        return [4 /*yield*/, userRepository.save([user1, user2])];
                    case 6:
                        _a.sent();
                        post1 = postRepository.create({
                            title: "My first post",
                            creationDate: new Date(),
                            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Turkish_Van_Cat.jpg/700px-Turkish_Van_Cat.jpg",
                            imgFilter: "sepia",
                            user: user1,
                            idUser: user1.id
                        });
                        post2 = postRepository.create({
                            title: "My second post",
                            creationDate: new Date(),
                            imgUrl: "https://static.onecms.io/wp-content/uploads/sites/47/2022/05/04/what-is-a-group-of-cats-called-2-1226896610-2000.jpg",
                            imgFilter: "black-and-white",
                            user: user1,
                            idUser: user1.id
                        });
                        post3 = postRepository.create({
                            title: "My first post User 2",
                            creationDate: new Date(),
                            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Turkish_Van_Cat.jpg/700px-Turkish_Van_Cat.jpg",
                            imgFilter: "sepia",
                            user: user2,
                            idUser: user2.id
                        });
                        post4 = postRepository.create({
                            title: "My second post User 2",
                            creationDate: new Date(),
                            imgUrl: "https://static.onecms.io/wp-content/uploads/sites/47/2022/05/04/what-is-a-group-of-cats-called-2-1226896610-2000.jpg",
                            imgFilter: "black-and-white",
                            user: user2,
                            idUser: user2.id
                        });
                        posts = [post1, post2, post3, post4];
                        return [4 /*yield*/, queryRunner.manager.save(posts)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    usersPosts1677812183801.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"post\" DROP CONSTRAINT \"FK_b19d2120615494c3f8c64dc338c\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"user\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"post\"")];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return usersPosts1677812183801;
}());
exports.usersPosts1677812183801 = usersPosts1677812183801;
//# sourceMappingURL=1677812183801-users_posts.js.map