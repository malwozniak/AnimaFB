import { Schema, model } from "mongoose";
import { IAddAnimation } from  '../types/addanimations'


export const aaddanimationSchema = new Schema({
  id: {
    type:String,
},
  user_Id: 
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

  status: {
    type: Boolean,
  },
}, { timestamps: true })

export default model<IAddAnimation>('AddAnimation', aaddanimationSchema)