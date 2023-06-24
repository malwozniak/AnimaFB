import axios, { AxiosResponse } from 'axios'
import { AnimationDataType, IAnimation } from './types/animation'

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
    console.log('Odpowiedź:', formData); 

    const info: Omit<IUser, 'key'> = {
      _id: formData._id,
      age: formData.age,
      gender: formData.gender,
      sayYesNo: formData.sayYesNo,
      animationType: formData.animationType,
      model: formData.model,
      object: formData.object,
      image: formData.image,
      section: formData.section,
      movement: formData.movement,
      numberOfBalls: formData.numberOfBalls,
      status: false,
    }
    // console.log("INFO", info)
    const saveUser: AxiosResponse<ApiDataType> = await axios.post(
        `${baseUrl}/users`,
      info
    )
    
    // console.log('Odpowiedź:', saveUser);
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
      // console.log(`${baseUrl}/users/${user._id}`)
try{
      const updatedUser: AxiosResponse<ApiDataType> = await axios.put(

        `${baseUrl}/users/${user._id}`, bodyUpdate
      )
    
      // console.log("Zaktulizowane dane po dodaniu danych.", updatedUser)
      return updatedUser
    }catch(error){
        throw new Error(String(error))

      }
     
  } catch (error){
        throw new Error(String(error))
      }
}
export const getAnimation = async (): Promise<AxiosResponse<IAnimation>> => {
  try {
    const allAnimations = await axios.get(
      baseUrl + '/animations' 
    )
    return allAnimations
  } catch (error) {
    throw new Error(String(error))
  }
}


export const getAnimationId = async (userId: string): Promise<AxiosResponse<IAnimation>> => {
  try {
    const animation = await axios.get(`${baseUrl}/users/${userId}`);
    return animation;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const addAnimation = async (
  formDataAnimation: IAnimation
): Promise<AxiosResponse<AnimationDataType>> => {
  try {
    console.log('Odpowiedź:', formDataAnimation); 


    const info: Omit<IAnimation, 'id'> = {
      userId: formDataAnimation.userId,
      name: formDataAnimation.name,
      positionX: formDataAnimation.positionX,
      positionY: formDataAnimation.positionY,
      positionZ: formDataAnimation.positionZ,
      // Add the missing properties and their corresponding values
      model: formDataAnimation.model,
      object: formDataAnimation.object,
      image: formDataAnimation.image,
      section: formDataAnimation.section,
      movement: formDataAnimation.movement,
      speed: formDataAnimation.speed,
      distance: formDataAnimation.distance,
      status: false,
    };
    // console.log("INFO", info)
    const saveAnimation: AxiosResponse<AnimationDataType> = await axios.post(
        `${baseUrl}/animations`,
      info
    )
    
    // console.log('Odpowiedź:', saveAnimation);
    return saveAnimation
  } catch (error) {
    throw new Error(String(error))
  }
}


export const updateAnimation = async (animation :IAnimation) : Promise<AxiosResponse<AnimationDataType>> => {
  try{
    const bodyUpdate: Pick<IAnimation, 'positionX'> = {
      positionX: animation.positionX
    };
      // console.log(`${baseUrl}/animations/${animation.id}`)
try{
      const updatedAnimations: AxiosResponse<AnimationDataType> = await axios.put(

        `${baseUrl}/animations/${animation.id}`, bodyUpdate
      )
    
      // console.log("Zaktulizowane dane po dodaniu danych.", updatedAnimation)
      return updatedAnimations
    }catch(error){
        throw new Error(String(error))

      }
     
  } catch (error){
        throw new Error(String(error))
      }
}