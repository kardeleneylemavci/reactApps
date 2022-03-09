import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';
import APIError from "../utils/APIError";
import bcrypt from "bcrypt-nodejs";

export const register = async (req, res, next) => {
    console.log("aloha register");
    try {
      
        const user = new User(req.body);
        const savedUser = await user.save();
        //savedUser.transform();
        res.status(httpStatus.CREATED);
        res.send({message: 'OK', savedUser});
    } catch (error) {
        return next(User.checkDuplicateEmailError(error));
    }
};

const passwordMatches =async(password, pass) => {
  return bcrypt.compareSync(password,pass);
}

 const findAndGenerateToken = async (payload) =>{
    const { email, password } = payload;
    if (!email) throw new APIError('Email must be provided for login');
    //console.log(email,'<====================>');
    const user = await User.findOne({ email}).exec();
    //console.log(user, '<==========>');
   if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND);
    const passwordOK = await passwordMatches(password,user.password);
    if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED);
    return user;
}

export const login = async (req, res, next) => {
    try {
        const user = await findAndGenerateToken(req.body);
        const payload = {sub: user.id};
        const token = jwt.sign(payload, config.secret);
       // console.log(token);
        return res.json({
            message: 'OK',
            token,
            user,
        });
    } catch (error) {
      //console.log(error);
        next(error);
    }
};

export const me = async (req, res, next) => {
    try {
        //console.log(req.user);
        return res.json({message: 'OK', user: req.user});
    } catch (error) {
        next(error);
    }
};
