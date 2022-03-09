import express from 'express';
import authRouter from './auth';
import newsRouter from './newsRouter';
import campsRouter from './campsRouter';

const router = express.Router();
//http://localhost:8000/api/auth
router.use('/auth', authRouter);
router.use('/news', newsRouter);
router.use('/camps', campsRouter);
//router.use('/categories', categoryRouter);
export default router;
