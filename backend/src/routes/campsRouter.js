import express from 'express';
import { campsSave, list,campsDel } from '../controllers/campaigne';
import auth from '../middlewares/authorization';

const router = express.Router();
//router.post('/register', validator(create), register);
router.post('/save',auth,campsSave);
router.get('/campsList',auth, list);
router.get('/remove/:_id',auth, campsDel);
export default router;
