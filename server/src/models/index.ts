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
    status: {
        type: Boolean,
        required: true
    }

}, { timestamps: true })


export default model<IUser>('User', userSchema)