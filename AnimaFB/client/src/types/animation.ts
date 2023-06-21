import { Schema } from "mongoose";

export interface Animation {
  id: number;
  name: string;
  time: number;
  moves: AnimationMoves[];
  sprites: AnimationSprites;
  species: AnimationSpecies;
  types: AnimationTypeItem[];
}
export interface AnimationDB extends Document {
  userId: number;
  gender: string;
  age: number;
  model: string;
  object: string;
  positionX: number;
  positionY: number;
  positionZ: number;
  image: string;
  section: string;
  moving: string;
  speed: number;
  distance: number;
  acceleration: number;
}

export const AnimationDBSchema = new Schema<AnimationDB>({
  userId: 
  {
    type: Number,
    required: true,
  },

  gender:
   {
    type: String,
    required: true,
  },

  age:
  {
    type: Number,
    required: true,
  },

  model:
  { 
    type: String
  },

  object: 
  {
    type: String
  },

  positionX: 
  {
    type: Number,
  },

  positionY: 
  {
    type: Number
  },

  positionZ: 
  { 
    type: Number,
  },

  image: 
  { 
  type: String,
  },

  section: 
  {
    type: String,
  },
  moving: 
  { 
    type: String,
  },
  speed:
  {
    type: Number,
  },
  distance:
  { 
    type: Number,
  },
  acceleration:
   {
    type: Number,
  },
});
export interface AnimationType {
  name: string;
  url: string;
}

export interface AnimationMoves {
  name: string;
  distance: number;
  acceleration: number;
  speed: number;
  points: Point[];
}
export interface AnimationSpecies {
  name: string;
  url: string;
}
export interface AnimationSprites {
  animation_base: string;
}

export interface AnimationTypeItem {
  slot: number;
  type: AnimationType;
}

export interface Point {
  x: number;
  y: number;
}

export interface User {
  id: number;
  age: number;
  gender: Gender;
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
