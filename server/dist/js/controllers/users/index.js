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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnimation = exports.addAnimation = exports.getAnimationById = exports.getAnimation = exports.updateUser = exports.addUser = exports.getUserById = exports.getUser = exports.getWeb = void 0;
const path_1 = __importDefault(require("path"));
const users_1 = require("./users");
Object.defineProperty(exports, "getUser", { enumerable: true, get: function () { return users_1.getUser; } });
Object.defineProperty(exports, "getUserById", { enumerable: true, get: function () { return users_1.getUserById; } });
Object.defineProperty(exports, "addUser", { enumerable: true, get: function () { return users_1.addUser; } });
Object.defineProperty(exports, "updateUser", { enumerable: true, get: function () { return users_1.updateUser; } });
const animations_1 = require("./animations");
Object.defineProperty(exports, "getAnimation", { enumerable: true, get: function () { return animations_1.getAnimation; } });
Object.defineProperty(exports, "getAnimationById", { enumerable: true, get: function () { return animations_1.getAnimationById; } });
Object.defineProperty(exports, "addAnimation", { enumerable: true, get: function () { return animations_1.addAnimation; } });
Object.defineProperty(exports, "updateAnimation", { enumerable: true, get: function () { return animations_1.updateAnimation; } });
const getWeb = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendFile(path_1.default.join(__dirname, '../../../../../client/build/index.html'));
    }
    catch (error) {
        console.log("AAAAA", error);
    }
});
exports.getWeb = getWeb;
