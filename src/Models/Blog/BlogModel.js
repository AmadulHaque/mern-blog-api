const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    title:{type:String},
    userName:{type:String},
    image:{type:String},
    summery:{type:String},
    description:{type:String},
    tag:{type:String},
    status:{type:Number,default:1},
    CreatedDate:{type:Date,default:Date.now()}
},{versionKey:false});
const BlogModel=mongoose.model('blogs',DataSchema);
module.exports=BlogModel