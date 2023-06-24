"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.animationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
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
        type: Array,
    },
    status: {
        type: Boolean,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Animation', exports.animationSchema);
