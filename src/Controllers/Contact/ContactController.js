const DataModel = require("../../Models/Contact/ContactModel");
const CreateService = require("../../Services/common/CreateService");
const UpdateService = require("../../Services/common/UpdateService");
const ListService = require("../../Services/common/ListService");
const DeleteService = require("../../Services/common/DeleteService");
const DetailsByIDService = require("../../Services/common/DetailsByIDService");
const SendEmailUtility = require("../../utility/SendEmailUtility");

exports.CreateContact=async (req, res) => {
    let PostBody =req.body;
    let {name,email,mobile,subject,message}=PostBody;
    let phone = mobile ? " Mobile : "+mobile+" ," : "";
    let Result= await CreateService(req,DataModel)
    if (Result.status=="success"){
        let SendEmail = await SendEmailUtility(email,"name : "+name+" , "+ phone +"  "+message,subject)
    }
    res.status(200).json(Result);
}

exports.UpdateContact=async (req, res) => {
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result)
}


exports.ContactList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{Name: SearchRgx}]
    let Result= await ListService(req,DataModel,SearchArray)
    res.status(200).json(Result)
}


exports.ContactDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,DataModel)
    if (Result.status=='fail') {
        res.status(400).json(Result)
    } else {
        res.status(200).json(Result)

    }
}


exports.DeleteContact=async (req, res) => {
    let Result=await DeleteService(req,DataModel);
    res.status(200).json(Result)
}
