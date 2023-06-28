interface IUser {
    _id: string
    age: number
    gender: string
    sayYesNo: string
    animationType: array
    model: array
    object: array
    opinion: array
    section: array
    movement: array
    badOpinion: array
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


  