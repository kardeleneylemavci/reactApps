import config from '../config';
import mongoose from 'mongoose';

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected');
});

mongoose.connection.on('error', (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(-1);
});

if (config.env === 'dev') {
  mongoose.set('debug', true);
}

const mongoURI = (config.env === 'prod' || 'dev' ? config.mongo.uri : config.mongo.testURI);

export default {
  connect: () => mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }),
  disconnect: () => mongoose.disconnect()
};
