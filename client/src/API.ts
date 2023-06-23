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


export const getUserId = async (userId: string): Promise<AxiosResponse<IUser>> => {
  try {
    const user = await axios.get(`${baseUrl}/users/${userId}`);
    return user;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const addUser = async (
  formData: IUser
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    console.log('Response:', formData); // Log the response object

    const info: Omit<IUser, 'key'> = {
      _id: formData._id,
      age: formData.age,
      gender: formData.gender,
      sayYesNo: formData.sayYesNo,
      animationType: formData.animationType,
      model: formData.model,
      object: formData.object,
      positionX: formData.positionX,
      positionY: formData.positionY,
      positionZ: formData.positionZ,
      image: formData.image,
      section: formData.section,
      movement: formData.movement,
      speed: formData.speed,
      distance: formData.distance,
      numberOfBalls: formData.numberOfBalls,
      status: false,
    }
    console.log("INFO", info)
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
    const bodyUpdate: Pick<IUser, 'numberOfBalls'> = {
      numberOfBalls: user.numberOfBalls
    };
      console.log("BU",bodyUpdate)
      console.log(`${baseUrl}/users/${user._id}`,user._id)
try{
      const updatedUser: AxiosResponse<ApiDataType> = await axios.put(

        `${baseUrl}/users/${user._id}`, bodyUpdate
      )
    
      console.log("NONO", updatedUser)
      return updatedUser
    }catch(error){
        throw new Error(String(error))

      }
     
  } catch (error){
        throw new Error(String(error))
      }
}
