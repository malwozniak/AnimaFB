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
exports.getUserById = exports.updateUser = exports.addUser = exports.getUser = void 0;
const users_1 = __importDefault(require("../../models/users"));
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.find();
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ error: 'Nie udało się pobrać użytkowników' });
    }
});
exports.getUser = getUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield users_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: 'Użytkownik nie znaleziony' });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error: 'Nie udało się pobrać użytkownika' });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updatedUser = yield users_1.default.findByIdAndUpdate({ _id: id }, { $set: body });
        const allUsers = yield users_1.default.find();
        res.status(200).json({
            message: 'Użytkownik zaktualizowany',
            user: updatedUser,
            users: allUsers,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Nie udało się zaktualizować użytkownika' });
    }
});
exports.updateUser = updateUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Validation
        if (body.age <= 0 || body.age > 150) {
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
        const user = new users_1.default({
            _id: body._id,
            age: body.age,
            gender: body.gender,
            sayYesNo: body.sayYesNo,
            animationType: body.animationType,
            model: body.model,
            object: body.object,
            image: body.image,
            section: body.section,
            movement: body.movement,
            numberOfBalls: body.numberOfBalls,
            status: false,
        });
        const newUser = yield user.save();
        const allUsers = yield users_1.default.find();
        // console.log('Odpowiedź dane użytkownika:', newUser); 
        res.status(201).json({ message: 'Użytkownik dodany.', user: newUser, users: allUsers });
    }
    catch (error) {
        res.status(500).json({ error: 'Nie udało się dodać użytkownika.' });
    }
});
exports.addUser = addUser;
