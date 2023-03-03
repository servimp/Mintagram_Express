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
require("reflect-metadata");
var PostController_1 = require("../src/controller/PostController");
var data_source_1 = require("../src/data-source");
var Post_1 = require("../src/entity/Post");
var jsonwebtoken_1 = require("jsonwebtoken");
require('dotenv').config();
describe('PostController', function () {
    var postController;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, data_source_1.AppDataSource.initialize()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            postController = new PostController_1.PostController();
            return [2 /*return*/];
        });
    }); });
    console.log(Reflect.getMetadata('design:type', Post_1.Post));
    console.log(Reflect.getMetadata('design:paramtypes', Post_1.Post));
    describe('save', function () {
        var req;
        var res;
        var next;
        beforeEach(function () {
            req = {
                body: {
                    title: 'Test Post',
                    creationDate: new Date(),
                    imgUrl: 'https://example.com/image.jpg',
                    imgFilter: 'grayscale',
                    idUser: 1,
                },
                headers: {
                    authorization: "Bearer ".concat((0, jsonwebtoken_1.sign)({ id: 1, username: 'testuser', firstName: 'test', lastName: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' })),
                },
            };
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            };
            next = jest.fn();
        });
        it('should return 401 Unauthorized with an invalid access token', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.headers.authorization = "Bearer invalidtoken";
                        console.log('Access token when invalid:', req.headers.authorization);
                        console.log('Token secret:', process.env.ACCESS_TOKEN_SECRET);
                        return [4 /*yield*/, postController.save(req, res, next)];
                    case 1:
                        _a.sent();
                        console.log('Response status:', res.status.mock.calls);
                        console.log('Response send:', res.send.mock.calls);
                        expect(res.status).toHaveBeenCalledWith(401);
                        expect(res.send).toHaveBeenCalledWith('Unauthorized');
                        expect(next).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        /*
            it('should save the post successfully with a valid access token', async () => {
            
        
              console.log('Access token when valid:', req.headers.authorization);
              console.log('Token secret:', process.env.ACCESS_TOKEN_SECRET);
              await postController.save(req, res, next);
              console.log('Response status:', res.status.mock.calls);
              console.log('Response send:', res.send.mock.calls);
            
              expect(res.status).not.toHaveBeenCalled();
              expect(res.send).toHaveBeenCalledWith(expect.any(Post));
              expect(next).not.toHaveBeenCalled();
            });
        */
    });
});
//# sourceMappingURL=PostController.test.js.map