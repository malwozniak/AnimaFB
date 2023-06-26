import { IUser } from  '../types/user'
import { model, Schema } from 'mongoose'

const userSchema: Schema = new Schema({
    _id: {
        type:String,
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
   

}, { timestamps: true })


export default model<IUser>('User', userSchema)