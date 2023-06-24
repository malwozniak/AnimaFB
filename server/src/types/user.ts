import { Document } from 'mongoose'

export interface IUser extends Document {
    _id: string
    age: number
    gender: string
    sayYesNo: string
    animationType: Array<string>
    model: Array<string>;
    object: Array<string>;
    image: Array<string>
    section: Array<string>
    movement: Array<string>
    numberOfBalls: Array<number>
    status: boolean
}