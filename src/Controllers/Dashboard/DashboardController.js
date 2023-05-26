const ContactModel = require("../../Models/Contact/ContactModel");
const BlogModel = require("../../Models/Blog/BlogModel");


const SummaryService = require("../../Services/summary/SummaryService");

exports.ContactTotal=async (req, res) => {
    let status = 0;
    let Result = await SummaryService(req,ContactModel,status);
    res.status(200).json(Result);
}
exports.BlogTotal=async (req, res) => {
    let status = 1;
    let Result = await SummaryService(req,BlogModel,status);
    res.status(200).json(Result);
}

exports.VisitorTotal=async (req, res) => {
    let total = 230;
    res.status(200).json({status: "success", data:{
        "status": "success",
        "data": [
            {
                "Total":total
            }
        ]
    }});
}