import { Response, Request } from 'express';
import { IAddAnimation } from '../../types/addanimations';
import AddAnimation from '../../models/addanimations';

  const addAddAnimation = async (req: Request, res: Response): Promise<void> => {
    try {
      const addanimationsData = req.body as IAddAnimation[];
  
      const addanimations: IAddAnimation[] = await AddAnimation.insertMany(addanimationsData);
  
      res.status(201).json({ message: 'Animacje dodane.', addanimations });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się dodać animacji.' });
    }
  };
  export {  addAddAnimation };

  