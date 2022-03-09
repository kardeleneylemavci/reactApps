import { Schema, model }  from 'mongoose';
const newsCamp = new Schema({
    name: {
        type: String,
        maxlength: 50
      },
    desc: {
        type: String,
        maxlength: 150
      },
    startDate: {
        type: String,
        maxlength: 50
      },
    endDate: {
        type: String,
        maxlength: 50
      },
    createdAt: Date
});
export default model('Camps', newsCamp);