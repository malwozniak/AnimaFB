import express from 'express';
import { getUser, addUser, updateUser, getWeb} from '../controllers/users';
import path from 'path';


const router = express.Router();
router.use(express.static(path.join(__dirname, '../../../../client/build'))); 


router.get('/users', getUser);
// router.get('/users', getUser)
router.get('*', getWeb);

router.post('/users', addUser)
router.post('/users', updateUser)
export default router;

