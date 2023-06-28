import { Schema, model } from "mongoose";
import { IAnimation } from  '../types/animation'


export const animationSchema = new Schema({
  id: {
    type:String,
},
  userId: 
  {
    type: String,
  },
  name: {
    type:String,
},

  object: 
  {
    type: String,
  },

  position: 
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
    type: Array,
  },
  speed: 
  {
    type: Array,
  },
  distance: 
  {
    type: Array,
  },
  information:{
    type: Object
  },
  status: {
    type: Boolean,
  },
}, { timestamps: true })

export default model<IAnimation>('Animation', animationSchema)