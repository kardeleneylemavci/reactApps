import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import config from '../config';
import { handleError, handleNotFound } from '../middlewares/error-handler';
import apiRouter from '../routes';
import passport from '../services/passport';

const app = express();
//app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({     // to support URL-encoded bodies
  limit: '150mb',
  extended: true
}));

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


//app.use(cors());
app.use(helmet());

if (config.env !== 'test') {
  app.use(morgan('combined'));
}
// passport

app.use(passport);
app.use('/api', apiRouter);
app.use(handleNotFound);
app.use(handleError);

export default app;