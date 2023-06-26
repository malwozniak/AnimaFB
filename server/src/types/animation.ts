import { Document } from 'mongoose'

export interface IAnimation extends Document {
  id: number
  userId: string
  name: string
  object: string
  position: number[]
  image: string
  section: string
  movement: string
  speed: number[]
  distance: string
  information:  any
  status: boolean
}
