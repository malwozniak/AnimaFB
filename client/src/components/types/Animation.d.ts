interface IAnimation {
  id: string
  userId: IUser | string
  name: string
  object: string
  position: number[]
  image: string
  section: string
  movement: string[]
  speed: number[]
  distance: string[]
  information:  any
  status: boolean
  createdAt?: string
  updatedAt?: string
  
  }

  export interface AnimationType {
    name: string
    url: string
  }

  type AnimationProps = {
    animation: IAnimation
}

type AnimationDataType = {
    message: string
    status: string
    animations: IAnimation[]
    animation?: IAnimation
  }

  export interface Point {
    x: number
    y: number
  }

  export interface AnimationMotionProps {

   updatePositions: (position: number[], speed: number[], move: string, distance: string, img: string) => void; 
   position: number[]
   speed: number[]
   move: string 
   distance: string
   img: string
  }
  interface AnimationListProps {
    // Existing props...
    onClick?: () => Promise<void>;
  }
  export interface BallBouncingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    ballSpeedValue: string
    ballMoveValue: string
    ballDistanceValue: string
  }