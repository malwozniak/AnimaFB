"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    sayYesNo: {
        type: String,
        required: true
    },
    animationType: {
        type: Array,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    movement: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    numberOfBalls: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
