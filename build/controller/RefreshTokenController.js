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
exports.RefreshTokenController = void 0;
require("reflect-metadata");
var jsonwebtoken_1 = require("jsonwebtoken");
var data_source_1 = require("../data-source");
var User_1 = require("../entity/User");
var RefreshTokenController = /** @class */ (function () {
    function RefreshTokenController() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    RefreshTokenController.prototype.refreshToken = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, decoded, userId, user, accessToken, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = request.cookies.refreshToken;
                        if (!refreshToken) {
                            console.log("unauthorized 1");
                            return [2 /*return*/, response.status(401).send('Unauthorized')];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        decoded = (0, jsonwebtoken_1.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                        userId = decoded.id;
                        console.log("userID=" + userId);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: userId }
                            })];
                    case 2:
                        user = _a.sent();
                        console.log("user=" + JSON.stringify(user));
                        console.log("user.rtoken=" + user.rtoken);
                        console.log("refreshToken=" + refreshToken);
                        if (!user || user.rtoken !== refreshToken) {
                            console.log("unauthorized 2");
                            return [2 /*return*/, response.status(401).send('Unauthorized')];
                        }
                        accessToken = (0, jsonwebtoken_1.sign)({
                            id: user.id,
                            username: user.username,
                            firstName: user.firstname,
                            lastName: user.lastname
                        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                        response.json({ accessToken: accessToken });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log("unauthorized 3");
                        return [2 /*return*/, response.status(401).send('Unauthorized')];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RefreshTokenController;
}());
exports.RefreshTokenController = RefreshTokenController;
//# sourceMappingURL=RefreshTokenController.js.map