
interface IAnimation {
  id: number;
  name: string;
  userId: IUser | string;
  model: string;
  object: jsx;
  positionX: number[];
  positionY: number[]
  positionZ: number[]
  image: string;
  section: string;
  movement: string;
  speed: number[]
  information: JSX
  status: boolean
  createdAt?: string
  updatedAt?: string
  }

  export interface AnimationType {
    name: string;
    url: string;
  }

  type AnimationProps = {
    animation: IAnimation
}

type AnimationDataType = {
    message: string
    status: string
    allAnimations: IAnimation[]
    animation?: IAnimation
  }

  export interface Point {
    x: number;
    y: number;
  }