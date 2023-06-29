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
exports.addAddAnimation = void 0;
const addanimations_1 = __importDefault(require("../../models/addanimations"));
const addAddAnimation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addanimationsData = req.body;
        const addanimations = yield addanimations_1.default.insertMany(addanimationsData);
        res.status(201).json({ message: 'Animacje dodane.', addanimations });
    }
    catch (error) {
        res.status(500).json({ error: 'Nie udało się dodać animacji.' });
    }
});
exports.addAddAnimation = addAddAnimation;
