"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    _id: {
        type: String,
    },
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
        type: Array,
    },
    object: {
        type: Array,
    },
    opinion: {
        type: Array,
    },
    section: {
        type: Array,
    },
    movement: {
        type: Array,
    },
    numberOfBalls: {
        type: Array,
    },
    status: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
