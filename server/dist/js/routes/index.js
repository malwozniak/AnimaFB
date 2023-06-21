"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.use(express_1.default.static(path_1.default.join(__dirname, '../../../../client/build'))); // Serve static files
router.get('/users', users_1.getUser);
// router.get('/users', getUser)
router.get('*', users_1.getWeb);
router.post('/insert', users_1.addUser);
exports.default = router;
