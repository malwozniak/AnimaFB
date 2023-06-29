import { Document } from 'mongoose'

export interface IAddAnimation extends Document {
  id: string
  user_Id: string
  position: number[]
  image: string
  movement: string[]
  speed: number[]
  distance: string[]
  status: boolean
}
