import { Response, Request } from 'express';
import User from '../../models/users';
import { IUser } from '../../types/user';



const getUser = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users: IUser[] = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się pobrać użytkowników' });
    }
  };
  
  const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const user: IUser | null = await User.findById(id);
  
      if (!user) {
        res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        return;
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się pobrać użytkownika' });
    }
  };


  

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: {id}, body,} = req;
      
   
      const updatedUser: IUser | null = await User.findByIdAndUpdate(
  
        { _id: id},
        { $set: body } 
      );
  
      const allUsers: IUser[] = await User.find()
      res.status(200).json({
          message: 'Użytkownik zaktualizowany',
          user: updatedUser,
          users: allUsers,
      })
      } catch (error) {
      res.status(500).json({ error: 'Nie udało się zaktualizować użytkownika' });
    }
  };
  
  const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<
        IUser,
        '_id' |'age' | 'gender' | 'sayYesNo' | 'animationType' | 'model' | 'object' | 
         'image' | 'section'| 'movement' | 'numberOfBalls' | 'status'
  
      >;
  
      // Validation
      if (body.age <= 0 || body.age > 150) {
        res.status(400).json({ error: 'Age must be between 1 and 100' });
        return;
      }
  
      if (!body.gender) {
        res.status(400).json({ error: 'Please provide a gender' });
        return;
      }
  
      if (!body.sayYesNo) {
        res.status(400).json({ error: 'Please select an option' });
        return;
      }
  
      if (!body.animationType || body.animationType.length === 0) {
        res.status(400).json({ error: 'Please select at least one animation type' });
        return;
      }
  
      const user: IUser = new User({
        _id: body._id,
        age: body.age,
        gender: body.gender,
        sayYesNo: body.sayYesNo,
        animationType: body.animationType,
        model: body.model,
        object: body.object,
        image: body.image,
        section: body.section,
        movement: body.movement,
        numberOfBalls: body.numberOfBalls,
        status: false,
      });
  
      const newUser: IUser = await user.save();
      const allUsers: IUser[] = await User.find();
      // console.log('Odpowiedź dane użytkownika:', newUser); 
  
      res.status(201).json({ message: 'Użytkownik dodany.', user: newUser, users: allUsers });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się dodać użytkownika.' });
    }
  };
  export { getUser, addUser, updateUser, getUserById };
