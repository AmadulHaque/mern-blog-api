const mongoose = require("mongoose");
const DeleteService= async (Request, Model) => {
    try{
        let DeleteID=Request.params.id;

        let QueryObject={};
        QueryObject['_id']=new mongoose.Types.ObjectId(DeleteID);
        let Delete=  await Model.deleteMany(QueryObject)
        return {status: "success",Delete:Delete}

    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=DeleteService