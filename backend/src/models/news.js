import { Schema, model }  from 'mongoose';
const newsSchema = new Schema({
  title:{
    type:String,
    minlength:3,
    maxlength:300,
    required:true
  },
  description:{
    type:String,
    minlength:2,
    maxlength:50000,
    required:true
  },
  author:{
    type:String,
    minlength:3,
    maxlength:150,
    required:false
  },
  status:{
    type:Boolean,
    required:true
  },
  media:{
    type:Object,
    required:false
  },
  createdAt:Date
});
export default model('News', newsSchema);
