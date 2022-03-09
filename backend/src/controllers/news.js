import News from "../models/news";
import httpStatus from "http-status";
import { existsSync, mkdirSync, writeFile, chmod } from 'fs';

export const newsSave = async (req, res, next) => {
  try {
    console.log(req.body, "news =====================================>>>");

    req.body.createdAt = new Date();
    let data = req.body;
    data.status = true;
    const newsRegister = new News(data);
    newsRegister.save((err, item) => {
      if (err) {
        next(err);
      } else {
        res.send(item, httpStatus.CREATED);
      }
    })

  } catch (error) {
    return next(error.reason);
  }
}

export const list = async (req, res, next) => {
  //console.log("list aloha");
  try {

    await News.find({}).exec((err, list) => {
      if (err) {
        next(err);
      } else {
        res.send(list);
      }
    });
  } catch (error) {
    return next(error.reason);
  }
}

export const newsDel = async (req, res, next) => {
  try {
    //console.log(req.params, '---------------------');
    let query = {
      author: req.params.author,
      status: req.params.status
    };

    News.remove(query).exec((err, item) => {
      if (err) {
        next(err);
      } else {
        res.send(item, httpStatus.OK);
      }
    });


  } catch (err) {
    next(err.reason);
  }
}

export const delById = async (req, res, next) => {
  try {
    //console.log(req.params, '---------------------');
    let query = {
      _id: req.params._id,
    };

    News.remove(query).exec((err, item) => {
      if (err) {
        next(err);
      } else {
        res.send(item, httpStatus.OK);
      }
    });


  } catch (err) {
    next(err.reason);
  }
}
export const newsById = async (req, res, next) => {
  try {

    let query = {
      _id: req.params._id
    };
    //console.log('<=======>',query);

    await News.findOne(query).exec((err, news) => {
      if (err) {
        next(err);
      } else {
        res.send(news);
      }
    })


  } catch (err) {
    next(err.reason);
  }
}
export const newsUpdate = async (req, res, next) => {
  try {
    console.log(req.params._id, req.body);
    let query = {
      _id: req.params._id
    };
    //$set hangi durumda collectiondaki data kaybına yol açar
    //yazarinYAzilari:[{},{}]

    await News.updateMany(query, { $set: req.body }).exec((err, news) => {
      if (err) {
        next(err);
      } else {
        res.send(news);
      }
    })
  } catch (err) {
    next(err.reason);
  }
}

export const fileUpload = async (req, res, next) => {
  try {
    console.log(process.env.INIT_CWD);

    let encoding = req.body.encoding || 'binary';
    let chroot = 'uploads';
    let file = req.body.outFile;
    let filePath = process.env.INIT_CWD + '/' + chroot + '/' + req.body.path + '/'; //home/ck/course2021/p2backendfronted/backend/uploads/images/
    let url = filePath + req.body.fileName; ///home/ck/course2021/p2backendfronted/backend/uploads/images/filename.png
    console.log(filePath, 'filepath');


    if (!existsSync(process.env.INIT_CWD + '/uploads')) {
      mkdirSync(process.env.INIT_CWD + '/uploads');
    }
    if (!existsSync(filePath)) {
      mkdirSync(filePath);
    }

    chmod(process.env.INIT_CWD + '/uploads', 0o755, (err) => {
      if (err) {
        next(err)
      } else {
        writeFile(url, file, encoding, function (err, filePath) {
          if (err) {
            next(err);
          } else {
            res.send('OK')
          }
        });
      }

    });

  } catch (error) {
    next(error);
  }
}