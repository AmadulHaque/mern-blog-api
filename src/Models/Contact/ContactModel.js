const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    mobile:{type:String},
    subject:{type:String},
    message:{type:String},
    status:{type:Number,default:1},
    CreatedDate:{type:Date,default:Date.now()}
},{versionKey:false});
const ContactModel=mongoose.model('contacts',DataSchema);
module.exports=ContactModel