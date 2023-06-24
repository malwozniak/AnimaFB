export interface AnimationUrl {
  id: number;
  name: string;
  time: number;
  types: AnimationTypeItem[];
}


export interface AnimationTypeItem {
  slot: number;
  type: AnimationType;
}
export interface AnimationType {
  name: string;
  url: string;
}

