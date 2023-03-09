const  Details =require('../models/UploadModals')
const users = require('../models/UserModels.js')


const getHouses = async(req, res)=>{
    const page_size=4
    // // const count=0
try {
    const page =parseInt(req.query.page || "0")
    // const  total= await post.countDocument({})
    // count = total.length
        const user_id =req.body.user_id;

       const houses =await Details.findAll({
        

        // limit:page_size,
            order: req.query.sort ? sqs.sort(req.query.sort) : [['id', 'desc']]
            })
            
             
       res.status(200).json(houses)
} catch (error) {
    res.status(500).json({mmg:'nop'})

    
}
}



module.exports = {getHouses}