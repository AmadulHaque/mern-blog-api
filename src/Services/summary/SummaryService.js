const SummaryService= async (Request,DataModel,status) => {
     try{
        let data=await  DataModel.aggregate([
            {$match: {status:status}},
            {
                $facet:{
                    Total:[{$count: "count"}]
                }
            }
        ])
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=SummaryService