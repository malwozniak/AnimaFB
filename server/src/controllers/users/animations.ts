import { Response, Request } from 'express';
import Animation from '../../models/animation';
import { IAnimation } from '../../types/animation';
import { isNumberObject } from 'util/types';



const getAnimation = async (_req: Request, res: Response): Promise<void> => {
    try {
      const animations: IAnimation[] = await Animation.find();
      console.log("Server", animations)
      res.status(200).json({ animations });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się pobrać animacji' });
    }
  };
  




  const getAnimationById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const animationOne: IAnimation | null = await Animation.findById(id);
  
      if (!animationOne) {
        res.status(404).json({ message: 'Animacja nie znaleziona.' });
        return;
      }
  
      res.status(200).json({ animationOne });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się pobrać animacji.' });
    }
  };


  const updateAnimation = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req;
  
      const updatedAnimations: IAnimation | null = await Animation.findByIdAndUpdate(
        { _id: id },
        { $push: { numberOfBall: body } },
      );
  
      if (updatedAnimations) {
        const updatedAnimation: IAnimation | null = await Animation.findByIdAndUpdate(
          { id: id },
          { $set: body },
          { new: true } // To return the updated document
        );
  
        const animations: IAnimation[] = await Animation.find();
        res.status(200).json({
          message: 'Animacja zaktualizowana',
          user: updatedAnimation,
          users: animations,
        });
      } else {
        res.status(404).json({ error: 'Nie znaleziono animacji' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się zaktualizować animacji' });
    }
  };
  
  const addAnimation = async (req: Request, res: Response): Promise<void> => {
    try {
      const animationsData = req.body as IAnimation[];
  
      const animations: IAnimation[] = await Animation.insertMany(animationsData);
  
      res.status(201).json({ message: 'Animacje dodane.', animations });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się dodać animacji.' });
    }
  };
  export { getAnimation, addAnimation, updateAnimation, getAnimationById };

  