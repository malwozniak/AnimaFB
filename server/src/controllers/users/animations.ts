import { Response, Request } from 'express';
import Animation from '../../models/animation';
import { IAnimation } from '../../types/animation';



const getAnimation = async (_req: Request, res: Response): Promise<void> => {
    try {
      const allAnimations: IAnimation[] = await Animation.find();
      res.status(200).json({ allAnimations });
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
        params: {id}, body,} = req;
      
   
      const updatedAnimations: IAnimation | null = await Animation.findByIdAndUpdate(
  
        { _id: id},
        { $set: body } 
      );
  
      const allAnima: IAnimation[] = await Animation.find()
      res.status(200).json({
          message: 'Animacja zaktualizowana',
          user: updatedAnimations,
          users: allAnima,
      })
      } catch (error) {
      res.status(500).json({ error: 'Nie udało się zaktualizować animacji' });
    }
  };
  
  const addAnimation = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<
        IAnimation,
        'id' | 'userId' | 'model' | 'object' | 'positionX' | 'positionY' | 'positionZ' |
         'image' | 'section'| 'movement' | 'speed' | 'distance' | 'status'
  
      >;
  
      const animation: IAnimation = new Animation({
        id: body.id,
        userId: body.userId,
        model: body.model,
        object: body.object,
        positionX: body.positionX,
        positionY: body.positionY,
        positionZ: body.positionZ,
        image: body.image,
        section: body.section,
        movement: body.movement,
        speed: body.speed,
        distance: body.distance,
        status: false,
      });
  
      const newAnimation: IAnimation = await animation.save();
      const allAnimations: IAnimation[] = await Animation.find();
      // console.log('Odpowiedź dane użytkownika:', newUser); 
  
      res.status(201).json({ message: 'Animacja dodana.', animmation: newAnimation, users: allAnimations });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się dodać animacji.' });
    }
  };
  export { getAnimation, addAnimation, updateAnimation, getAnimationById };
