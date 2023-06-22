import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:3000'

export const getUser = async (): Promise<AxiosResponse<IUser>> => {
  try {
    const users = await axios.get(
      baseUrl + '/users'
    )
    return users
  } catch (error) {
    throw new Error(String(error))
  }
}

export const addUser = async (
  formData: IUser
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const info: Omit<IUser, '_id'> = {
      age: formData.age,
      gender: formData.gender,
      sayYesNo: formData.sayYesNo,
      animationType: formData.animationType,
      status: false,
    }
    const saveUser: AxiosResponse<ApiDataType> = await axios.post(
        `${baseUrl}/users`,
      info
    )
    
    console.log('Response:', saveUser); // Log the response object
    return saveUser
  } catch (error) {
    throw new Error(String(error))
  }
}


export const updateUser = async (user :IUser) : Promise<AxiosResponse<ApiDataType>> => {
  try{
      const bodyUpdate: Pick<IUser, 'status'> = {
        status: true,
      }
      const updatedUser: AxiosResponse<ApiDataType> = await axios.put(

        `${baseUrl}/users/${user._id}`, bodyUpdate
      )
      return updatedUser
  } catch (error){
        throw new Error(String(error))
      }
}
