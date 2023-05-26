const DataModel = require("../../Models/Users/UserModel");
const OTPSModel = require("../../Models/Users/OTPModel");
const UserCreateService = require("../../Services/User/UserCreateService");
const UserLoginService = require("../../Services/User/UserLoginService");
const UserUpdateService = require("../../Services/User/UserUpdateService");
const UserDetailsService = require("../../Services/User/UserDetailsService");
const UserResetPassService = require("../../Services/User/UserRestPassService");
const UserVerifyOtpService = require("../../Services/User/UserVerifyOtpService");
const UserVerifyEmailService = require("../../Services/User/UserVerifyEmailService");
const formidable = require('formidable');
const fs = require('fs');
const { log } = require("console");



exports.Registration=async (req, res) => {
    let Result=await UserCreateService(req,DataModel)
    res.status(200).json(Result)
}

exports.Login=async(req,res)=>{
    let Result=await UserLoginService(req,DataModel)
    res.status(200).json(Result)
}


exports.ProfileUpdate = async (req, res) => {
  let data = await DataModel.aggregate([{$match:{email:req.headers['email']}}]);
  const img =  data[0]['photo'];
    const form = formidable({ multiples: true });
    try {
      const { fields, files } = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
              if (err) {
                  reject(err);
              } else {
                  resolve({ fields, files });
              }
          });
      });
      const ReqBody = fields;
      if (ReqBody.photo=="undefined") {
        ReqBody['photo'] = img;
      }else{
          files.photo.originalFilename = "profile_" + files.photo.originalFilename;
          const newpath = __dirname + `./../../uploads/${files.photo.originalFilename}`;
          await new Promise((resolve, reject) => {
            fs.copyFile(files.photo.filepath, newpath, error => {
              if (error) {
                reject(error);
              } else {
                console.log("File upload success");
                resolve();
              }
            });
          });
          let  imgPath = "/uploads/"+files.photo.originalFilename;
          ReqBody['photo'] = imgPath;
          const filePath  = __dirname + `./../../${img}`;
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }else{
              console.log("img remove Success");
            }
          });
      }
      const Result = await UserUpdateService(req, ReqBody, DataModel);
      res.status(200).json(Result);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// exports.ProfileUpdate=async (req, res) => {
//     const form = formidable({ multiples: true });
//     form.parse(req, (err, fields, files) => {
//       let ReqBody= fields;
//         if (files==null) {
//         }else{
//           files.image.originalFilename = "profile_" + files.image.originalFilename;
//           var newpath = __dirname + `./../../uploads/${files.image.originalFilename}`
//           fs.copyFile(files.image.filepath,newpath,error =>  {
//               if (error) {
//                   console.log(error);
//               }else{
//                   console.log("file upload Success");
//               }
//           })
//           ReqBody['photo']=files.image.originalFilename
//         }
//         DataModel.updateOne({email:Request.headers['email']},ReqBody)
//     });
// }

exports.ProfileDetails=async (req, res) => {
    let Result=await UserDetailsService(req,DataModel)
    res.status(200).json(Result)
}


exports.RecoverVerifyEmail=async (req,res)=>{
    let Result=await UserVerifyEmailService(req,DataModel)
    res.status(200).json(Result)
}


exports.RecoverVerifyOTP=async (req,res)=>{
    let Result=await UserVerifyOtpService(req,OTPSModel)
    res.status(200).json(Result)
}

exports.RecoverResetPass=async (req,res)=>{
    let Result=await UserResetPassService(req,DataModel)
    res.status(200).json(Result)
}
