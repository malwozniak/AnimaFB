import axios, { AxiosResponse } from 'axios'
import { AnimationDataType, IAnimation } from '../components/types/Animation'

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
    // console.log('Odpowiedź:', formData); 

    const info: Omit<IUser, 'key'> = {
      _id: formData._id,
      age: formData.age,
      gender: formData.gender,
      sayYesNo: formData.sayYesNo,
      animationType: formData.animationType,
      model: formData.model,
      object: formData.object,
      opinion: formData.opinion,
      section: formData.section,
      movement: formData.movement,
      numberOfBalls: formData.numberOfBalls,
      status: false,
    }
   console.log("INFO", info)
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
     console.log(`${baseUrl}/users/${user._id}`)
try{
      const updatedUser: AxiosResponse<ApiDataType> = await axios.put(

        `${baseUrl}/users/${user._id}`, bodyUpdate
      )
    
      console.log("Zaktulizowane dane po dodaniu danych.", updatedUser)
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
    const animations = await axios.get(
      baseUrl + '/animations' 
    )
    return animations
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
  animationData: IAnimation
): Promise<AxiosResponse<AnimationDataType>> => {
  try {
    console.log('AnimationData:', animationData); 


    const info: Omit<IAnimation, 'key'> = {
      id: animationData.id,
      userId: animationData.userId,
      name: animationData.name,
      position: animationData.position,
      object: animationData.object,
      image: animationData.image,
      section: animationData.section,
      movement: animationData.movement,
      speed: animationData.speed,
      distance: animationData.distance,
      information: animationData.information,
      status: false,
    };
   console.log("INFO", info)
    const saveAnimation: AxiosResponse<AnimationDataType> = await axios.post(
        `${baseUrl}/animations`,
      info
    )
    
    console.log('Odpowiedź animacja:', saveAnimation);
    return saveAnimation
  } catch (error) {
    throw new Error(String(error))
  }
}


// export const updateAnimation = async (animation :IAnimation) : Promise<AxiosResponse<AnimationDataType>> => {
//   try{
//     const bodyUpdate: Pick<IAnimation, 'positionX'> = {
//       positionX: animation.positionX
//     };
//       // console.log(`${baseUrl}/animations/${animation.id}`)
// try{
//       const updatedAnimations: AxiosResponse<AnimationDataType> = await axios.put(

//         `${baseUrl}/animations/${animation.id}`, bodyUpdate
//       )
    
//       // console.log("Zaktulizowane dane po dodaniu danych.", updatedAnimation)
//       return updatedAnimations
//     }catch(error){
//         throw new Error(String(error))

//       }
     
//   } catch (error){
//         throw new Error(String(error))
//       }
// }