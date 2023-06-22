import { IUser } from  '../types/user'
import { model, Schema } from 'mongoose'

const userSchema: Schema = new Schema({
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

}, { timestamps: true })


export default model<IUser>('User', userSchema)