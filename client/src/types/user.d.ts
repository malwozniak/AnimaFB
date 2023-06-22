interface IUser {
    _id: string
    age: number
    gender: string
    sayYesNo: string
    animationType: array
    model: string;
    object: string;
    positionX: number
    positionY: number
    positionZ: number
    image: string
    section: string
    movement: string
    speed: number
    distance: number
    numberOfBalls: number
    status: boolean
    createdAt?: string
    updatedAt?: string
}

type UserProps = {
    user: IUser
}

type ApiDataType = {
    message: string
    status: string
    users: IUser[]
    user?: IUser
  }