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
        required: true

    },
    object: {
        type: Array,
        required: true

    },
    opinion: {
        type: Array,
        required: true

    },
    badOpinion: {
        type: Array,
        required: true

    },
    section: {
        type: Array,
        required: true

    },
    movement: {
        type: Array,
        required: true

    },
    numberOfBalls: {
        type: Array,
        required: true

    },
    status: {
        type: Boolean,
        required: true
    },
   

}, { timestamps: true })


export default model<IUser>('User', userSchema)