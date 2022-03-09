const NODE_ENV= process.env.NODE_ENV || "dev";
const PORT=8000;
const MONGOURI="mongodb://localhost:27017/course";
const MONGOTESTURI="mongodb://localhost:27017/course";
const APP_SECRET="soup4every1";
const HOST="localhost:3000";
const DANGEROUSLY_DISABLE_HOST_CHECK=true;

export default {
  port: PORT,
  env: NODE_ENV,
  secret: APP_SECRET,
  host:HOST,
  disableHostCheck:DANGEROUSLY_DISABLE_HOST_CHECK,
  https:true,
  compress: true,
  mongo: {
    uri:MONGOURI,
    testURI: MONGOTESTURI
  }
};