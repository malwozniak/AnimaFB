
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
  speed: string;
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

  export interface AnimationMotionProps {

    updatePositions: (x: number, y: number, z: number, img: string, speed: string, move: string, distance: string) => void;
  }

  export interface BallBouncingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    ballSpeedValue: string;
    ballMoveValue: string;
    ballDistanceValue: string;
  }