"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aaddanimationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.aaddanimationSchema = new mongoose_1.Schema({
    id: {
        type: String,
    },
    user_Id: {
        type: String,
    },
    name: {
        type: String,
    },
    position: {
        type: Array,
    },
    image: {
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
    status: {
        type: Boolean,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('AddAnimation', addanimationSchema);
