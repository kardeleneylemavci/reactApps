import { Schema, model }  from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import httpStatus from 'http-status';
import APIError from '../utils/APIError';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128
  },
  name: {
    type: String,
    maxlength: 50
  },
  phone:{
    type:String
  },
  role:{
    type:String
  }
},{
  timestamps: true
});

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    this.password = bcrypt.hashSync(this.password);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'role', 'createdAt'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  }
});

userSchema.statics = {
  checkDuplicateEmailError(err) {
    if (err.code === 11000) {
      var error = new Error('Email already taken');
      error.errors = [{
        field: 'email',
        location: 'body',
        messages: ['Email already taken']
      }];
      error.status = httpStatus.CONFLICT;
      return error;
    }
    return err;
  },

  async findAndGenerateToken(payload) {
    const { email, password } = payload;
    if (!email) throw new APIError('Email must be provided for login');
    const user = await this.findOne({ email }).exec();
    if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND);
    const passwordOK = await user.passwordMatches(password);
    if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED);
    return user;
  }
};

export default model('User', userSchema);
