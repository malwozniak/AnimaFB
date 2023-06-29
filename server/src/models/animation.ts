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

 
  section: 
  {
    type: String,
  },
  information:{
    type: Object
  },
  status: {
    type: Boolean,
  },
}, { timestamps: true })

export default model<IAnimation>('Animation', animationSchema)