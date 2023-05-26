const CreateToken =require('../../utility/CreteToken');
const UserLoginService = async (Request,DataModel) =>{
    try {
        let data = await DataModel.aggregate([{$match:Request.body},{$project:{_id:0,email:1,name:1,username:1,mobile:1,photo:1}}])
        if (data.length > 0){
            let token = await  CreateToken(data[0]['email']);
            return {status:"Success",token:token,data:data}
        }else{
            return {status:"unauthorized"}
        }
    }catch (e) {
        return {status:"fail",data:e.toString()}
    }
}
module.exports = UserLoginService;