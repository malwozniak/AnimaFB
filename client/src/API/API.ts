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
      badOpinion: formData.badOpinion,
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

export const updateUser = async (
  user: IUser,
  newNumberOfBalls: number,
  newMovement: string[],
  newSection: string[],
  newOpinion: string,
  badOpinion: string,
  object: string[]
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const bodyUpdate: Pick<
      IUser,
      'numberOfBalls' | 'movement' | 'section' | 'opinion' | 'badOpinion' | 'object'
    > = {
      object: [...user.object, object],
      numberOfBalls: [...user.numberOfBalls, newNumberOfBalls],
      movement: [...user.movement, ...newMovement],
      section: [...user.section, ...newSection],
      opinion: [...user.opinion, newOpinion],
      badOpinion: [...user.badOpinion, badOpinion],
      
    };

    console.log(`${baseUrl}/users/${user._id}`);

    try {
      const updatedUser: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/users/${user._id}/`,
        bodyUpdate
      );

      console.log("Updated data after adding number of balls:", updatedUser);
      return updatedUser;
    } catch (error) {
      throw new Error(String(error));
    }
  } catch (error) {
    throw new Error(String(error));
  }
};


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
    const animation = await axios.get(`${baseUrl}/animations/${userId}`);
    return animation;
  } catch (error) {
    throw new Error(String(error));
  }
};




export const addAnimation = async (
  animationData: IAnimation[]
): Promise<AxiosResponse<AnimationDataType>> => {
  try {
    console.log('AnimationData:', animationData); 

    const animations: Omit<IAnimation, 'key'>[] = animationData.map(animation => ({
      id: animation.id,
      userId: animation.userId,
      name: animation.name,
      object: animation.object,
      section: animation.section,
      information: animation.information,
      status: false,
    }));

    console.log('Animations:', animations);

    const saveAnimations: AxiosResponse<AnimationDataType> = await axios.post(
      `${baseUrl}/animations`,
      animations
    );

    console.log('Odpowiedź animacje:', saveAnimations);
    return saveAnimations;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const addAddAnimation = async (
  animationData: IAddAnimation[]
): Promise<AxiosResponse<AnimationDataType>> => {
  try {
    console.log('AnimationData:', animationData); 

    const addanimations: Omit<IAddAnimation, 'key'>[] = animationData.map(animation => ({
      id: animation.id,
      user_id: animation.user_id,
      position: animation.position,
      image: animation.image,
      movement: animation.movement,
      speed: animation.speed,
      distance: animation.distance,
      status: false,
    }));

    console.log('Animations:', addanimations);

    const saveaddAnimations: AxiosResponse<AnimationDataType> = await axios.post(
      `${baseUrl}/addanimations`,
      addanimations
    );

    console.log('Odpowiedź animacje:', saveaddAnimations);
    return saveaddAnimations;
  } catch (error) {
    throw new Error(String(error));
  }
};

// export const saveUpdateAnimation = async (animationData: IAnimation[]): Promise<AxiosResponse<AnimationDataType>> => {
//   try {
//     const updatedAnimations: AxiosResponse<AnimationDataType>[] = await Promise.all(animationData.map(async () => {
    
      
//       const updatedAnimation: AxiosResponse<AnimationDataType> = await axios.put(
//         `${baseUrl}/animations/`,
//         {
         
//         }
//       );
      
//       return updatedAnimation;
//     }));
    
//     // Assuming you want to return the first updated animation
//     return updatedAnimations[0];
//   } catch (error) {
//     throw new Error(String(error));
//   }
// };
