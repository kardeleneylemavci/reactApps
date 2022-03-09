import express from 'express';
import { newsSave, list, newsDel, delById, newsById, newsUpdate,fileUpload} from '../controllers/news';
import auth from '../middlewares/authorization';

const router = express.Router();
//router.post('/register', validator(create), register);
router.post('/save',newsSave);
router.get('/list', list);
router.delete('/removeByName/:author/:status', newsDel);
router.delete('/removeById/:_id', delById);
router.get('/detail/:_id', newsById);
router.put('/update/:_id',newsUpdate);
router.post('/upload', fileUpload);
export default router;
