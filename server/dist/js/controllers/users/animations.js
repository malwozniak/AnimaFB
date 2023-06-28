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
exports.getAnimationById = exports.updateAnimation = exports.addAnimation = exports.getAnimation = void 0;
const animation_1 = __importDefault(require("../../models/animation"));
const getAnimation = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animations = yield animation_1.default.find();
        console.log("Server", animations);
        res.status(200).json({ animations });
    }
    catch (error) {
        res.status(500).json({ error: 'Nie udało się pobrać animacji' });
    }
});
exports.getAnimation = getAnimation;
const getAnimationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const animationOne = yield animation_1.default.findById(id);
        if (!animationOne) {
            res.status(404).json({ message: 'Animacja nie znaleziona.' });
            return;
        }
        res.status(200).json({ animationOne });
    }
    catch (error) {
        res.status(500).json({ error: 'Nie udało się pobrać animacji.' });
    }
});
exports.getAnimationById = getAnimationById;
const updateAnimation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updatedAnimations = yield animation_1.default.findByIdAndUpdate({ _id: id }, { $push: { numberOfBall: body } });
        if (updatedAnimations) {
            const updatedAnimation = yield animation_1.default.findByIdAndUpdate({ id: id }, { $set: body }, { new: true } // To return the updated document
            );
            const animations = yield animation_1.default.find();
            res.status(200).json({
                message: 'Animacja zaktualizowana',
                user: updatedAnimation,
                users: animations,
            });
        }
        else {
            res.status(404).json({ error: 'Nie znaleziono animacji' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Nie udało się zaktualizować animacji' });
    }
});
exports.updateAnimation = updateAnimation;
const addAnimation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animationsData = req.body;
        const animations = yield animation_1.default.insertMany(animationsData);
        res.status(201).json({ message: 'Animacje dodane.', animations });
    }
    catch (error) {
        res.status(500).json({ error: 'Nie udało się dodać animacji.' });
    }
});
exports.addAnimation = addAnimation;
