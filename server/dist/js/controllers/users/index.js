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
exports.getWeb = exports.updateUser = exports.addUser = exports.getUser = void 0;
const models_1 = __importDefault(require("../../models"));
const path_1 = __importDefault(require("path"));
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.default.find();
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
exports.getUser = getUser;
const getWeb = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendFile(path_1.default.join(__dirname, '../../../../../client/build/index.html'));
    }
    catch (error) {
        console.log("AAAAA", error);
    }
});
exports.getWeb = getWeb;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updatedUser = yield models_1.default.findByIdAndUpdate({ _id: id }, body);
        const allUsers = yield models_1.default.find();
        res.status(200).json({
            message: 'User updated',
            user: updatedUser,
            users: allUsers,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
exports.updateUser = updateUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Validation
        if (body.age <= 0 || body.age > 100) {
            res.status(400).json({ error: 'Age must be between 1 and 100' });
            return;
        }
        if (!body.gender) {
            res.status(400).json({ error: 'Please provide a gender' });
            return;
        }
        if (!body.sayYesNo) {
            res.status(400).json({ error: 'Please select an option' });
            return;
        }
        if (!body.animationType || body.animationType.length === 0) {
            res.status(400).json({ error: 'Please select at least one animation type' });
            return;
        }
        const user = new models_1.default({
            age: body.age,
            gender: body.gender,
            sayYesNo: body.sayYesNo,
            animationType: body.animationType,
            status: false,
        });
        const newUser = yield user.save();
        const allUsers = yield models_1.default.find();
        res.status(201).json({ message: 'User added', user: newUser, users: allUsers });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});
exports.addUser = addUser;
