import express from 'express';
import { getUser, addUser, updateUser, getWeb, getUserById, getAnimation, addAnimation, getAnimationById, updateAnimation} from '../controllers/users/';
import path from 'path';
import { addAddAnimation } from '../controllers/users/addanimations';


const router = express.Router();
router.use(express.static(path.join(__dirname, '../../../../client/build'))); 

// router.get('*', getWeb);

/**Użytkownik */

router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.post('/users', addUser)
router.put('/users/:id', updateUser)

/**Animacje */
router.get('/animations', getAnimation);
router.get('/animations/:id', getAnimationById);
router.post('/animations', addAnimation)
// router.put('/animations/:id', updateAnimation)
router.post('/addanimations', addAddAnimation)

export default router;

