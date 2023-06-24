import { Schema, model } from "mongoose";
import { IAnimation } from  '../types/animation'


export const animationSchema = new Schema({

  userId: 
  {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  model:
  {
    type: String,
  },

  object: 
  {
    type: String,
  },

  positionX: 
  {
    type: Array,
  },

  positionY: 
  {
    type: Array,
  },

  positionZ: 
  {
    type: Array,
  },

  image: 
  {
    type: String,
  },

  section: 
  {
    type: String,
  },
  movement: 
  {
    type: String,
  },
  speed: 
  {
    type: Array,
  },
  distance: 
  {
    type: Array,
  },
  status: {
    type: Boolean,
  },
}, { timestamps: true })

export default model<IAnimation>('Animation', animationSchema)