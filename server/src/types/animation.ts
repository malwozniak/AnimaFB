import { IUser } from "./user";
import { Document } from 'mongoose'

export interface IAnimation extends Document {
  id: number;
  userId: IUser; 
  model: string;
  object: string;
  positionX: number[]
  positionY: number[]
  positionZ: number[]
  image: string;
  section: string;
  movement: string;
  speed: number[]
  distance: number[]
  status: boolean
}
