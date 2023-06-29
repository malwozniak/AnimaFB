import { Document } from 'mongoose'

export interface IAnimation extends Document {
  id: string
  userId: string
  name: string
  object: string
  section: string
  information:  any
  status: boolean
}
