const UserCreateService = async (Request,DataModel) =>{
    try {
        let  PostBody = Request.body;
        let data = await DataModel.create(PostBody)
        return {status:"Success",data:data}
    }catch (e) {
        return {status:"fail",data:e}
    }
}
module.exports = UserCreateService;