
const UserDetailsService = async (Request,DataModel) =>{
    try {
        let  PostBody = Request.body;
        let data = await DataModel.aggregate([{$match:{email:Request.headers['email']}}])
        return {status:"Success",data:data}
    }catch (e) {
        return {status:"fail",data:e.toString()}
    }
}
module.exports = UserDetailsService;