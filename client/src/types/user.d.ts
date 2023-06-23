interface IUser {
    _id: string
    age: number
    gender: string
    sayYesNo: string
    animationType: array
    model: array;
    object: array;
    positionX: array
    positionY: array
    positionZ: array
    image: array
    section: array
    movement: array
    speed: array
    distance: array
    numberOfBalls: array
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