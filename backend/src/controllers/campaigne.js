import Camps from "../models/campaigne";
import httpStatus from "http-status";

export const campsSave = async (req, res, next) => {
  try {
    console.log(req.body);

    req.body.createdAt=new Date();
    const campaignes = new Camps(req.body);
    const savedCampaigne =campaignes.save();
    res.status(httpStatus.CREATED);
    res.send({savedCampaigne});
  } catch (error) {
    return next(error.reason);
  }
};

export const list = async (req, res, next)=>{
    console.log("KONTROOOOOLLLLL");
    try{
      let campaigneList = await Camps.find().exec();
      res.status(httpStatus.CREATED);
      res.send({campaigneList});
    } catch ( error){
      return next(error.reason);
    }
  };
  export const campsDel = async (req, res, next) => {
    try {
      console.log(req.params, '---------------------');
      let query = {
        _id: req.params._id
      };
      let removedCamps = Camps.remove(query).exec();
      res.status(httpStatus.CREATED);
      res.send({removedCamps});
    } catch (err) {
      next(err.reason);
    }
  }