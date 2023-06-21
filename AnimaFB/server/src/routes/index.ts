import express from 'express';
import { getUser, addUser, updateUser, getWeb} from '../controllers/users';
import { IUser } from '../types/user';
import User from '../models';
import path from 'path';


const router = express.Router();
router.use(express.static(path.join(__dirname, '../../../../client/build'))); // Serve static files

router.get('/users', getUser);
// router.get('/users', getUser)
router.get('*', getWeb);

router.post('/insert', addUser)

export default router;

