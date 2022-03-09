import express from 'express';
import validator from 'express-validation';
import { register, login, me } from '../controllers/user';
import { create } from '../validations/user';
import auth from '../middlewares/authorization';

const router = express.Router();
//router.post('/register', validator(create), register);
router.post('/register', validator(create), register);
router.post('/login', login);
router.get('/me', auth, me);

export default router;
