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
    object: {
        type: String,
    },
    position: {
        type: Array,
    },
    image: {
        type: String,
    },
    section: {
        type: String,
    },
    movement: {
        type: Array,
    },
    speed: {
        type: Array,
    },
    distance: {
        type: Array,
    },
    information: {
        type: Object
    },
    status: {
        type: Boolean,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Animation', exports.animationSchema);
