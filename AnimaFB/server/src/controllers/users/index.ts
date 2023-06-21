import { Response, Request } from 'express';
import User from '../../models';
import { IUser } from '../../types/user';
import path from 'path';

const getUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getWeb = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.sendFile(path.join(__dirname, '../../../../../client/build/index.html'));
  } catch (error) {
    console.log("AAAAA", error);
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const body = req.body as Pick<
      IUser,
      'age' | 'gender' | 'sayYesNo' | 'animationType' | 'status'
    >;

    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    const allUsers: IUser[] = await User.find();
    res.status(200).json({ message: 'User updated', user: updatedUser, users: allUsers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IUser,
      'age' | 'gender' | 'sayYesNo' | 'animationType' | 'status'
    >;

    // Validation
    if (body.age <= 0 || body.age > 100) {
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
      age: body.age,
      gender: body.gender,
      sayYesNo: body.sayYesNo,
      animationType: body.animationType,
      status: false,
    });

    const newUser: IUser = await user.save();
    const allUsers: IUser[] = await User.find();

    res.status(201).json({ message: 'User added', user: newUser, users: allUsers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
};

export { getUser, addUser, updateUser, getWeb };
