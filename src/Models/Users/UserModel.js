const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    email:{type:String,unique:true},
    firstname:{type:String},
    title:{type:String},
    lastname:{type:String},
    mobile:{type:String},
    password:{type:String},
    photo:{type:String},
    age:{type:Number},
    nationality:{type:String},
    address :{type:String},
    skype :{type:String},
    languages:{type:String},
    experience:{type:String},
    project:{type:String},
    contactTitle:{type:String},
    facebook:{type:String},
    youtube:{type:String},
    github:{type:String},
    linkedin:{type:String},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});
const UsersModel=mongoose.model('users',DataSchema);
module.exports=UsersModel