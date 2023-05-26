const UserUpdateService = async (Request,ReqBody,DataModel) =>{
    try {
        let data = await DataModel.updateOne({email:Request.headers['email']},ReqBody)
        return {status:"Success",data:ReqBody}
    }catch (e) {
        return {status:"fail",data:e.toString()}
    }
}
module.exports = UserUpdateService;