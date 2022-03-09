import Joi from 'joi';

// User validation rules
export const create = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
    name: Joi.string().max(128).required(),
    phone:Joi.string().max(11).required(),
    role: Joi.string().max(50).required()
  }
};
