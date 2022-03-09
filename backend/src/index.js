import db from './services/mongoose';
import app from './services/express';
import config from './config';


// connect to database then start app
db.connect().then(() => {
  app.listen(config.port, (err) => {
    if (err) {
      console.log(`Error : ${err}`);
      process.exit(-1);
    }

    console.log(`server is running on ${config.port}`);
  });
});
