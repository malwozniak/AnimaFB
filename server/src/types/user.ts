import { Document } from 'mongoose'

export interface IUser extends Document {
    age: number
    gender: string
    sayYesNo: string
    animationType: Array<string>
    status: boolean
}