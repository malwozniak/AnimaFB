import { Response, Request } from 'express';
import Animation from '../../models/animation';
import { IAnimation } from '../../types/animation';



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
        'id' | 'userId' | 'name'  | 'object' | 'position' |
         'image' | 'section'| 'movement' | 'speed' | 'distance' | 'information' | 'status'
  
      >;
  
      const animation: IAnimation = new Animation({
        id: body.id,
        userId: body.userId,
        name: body.name,
        object: body.object,
        position: body.position,
        image: body.image,
        section: body.section,
        movement: body.movement,
        speed: body.speed,
        distance: body.distance,
        information: body.information,
        status: false,
      });
  
      const newAnimation: IAnimation = await animation.save();
      const animations: IAnimation[] = await Animation.find();
      // console.log('Odpowiedź dane użytkownika:', newUser); 
  
      res.status(201).json({ message: 'Animacja dodana.', animmation: newAnimation, users: animations });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się dodać animacji.' });
    }
  };
  export { getAnimation, addAnimation, updateAnimation, getAnimationById };
