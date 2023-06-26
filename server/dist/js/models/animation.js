"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.animationSchema = new mongoose_1.Schema({
    id: {
        type: String,
    },
    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    model: {
        type: String,
    },
    object: {
        type: String,
    },
    positionX: {
        type: Array,
    },
    positionY: {
        type: Array,
    },
    positionZ: {
        type: Array,
    },
    image: {
        type: String,
    },
    section: {
        type: String,
    },
    movement: {
        type: String,
    },
    speed: {
        type: Array,
    },
    distance: {
        type: String,
    },
    information: {
        type: Object
    },
    status: {
        type: Boolean,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Animation', exports.animationSchema);
