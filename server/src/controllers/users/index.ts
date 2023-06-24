import { Response, Request } from 'express';
import path from 'path';
import { getUser, getUserById, addUser, updateUser } from './users';
import { getAnimation, getAnimationById, addAnimation, updateAnimation } from './animations';

const getWeb = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.sendFile(path.join(__dirname, '../../../../../client/build/index.html'));
  } catch (error) {
    console.log("AAAAA", error);
  }
};
export { getWeb, getUser, getUserById, addUser, updateUser, getAnimation, getAnimationById,
addAnimation, updateAnimation};
