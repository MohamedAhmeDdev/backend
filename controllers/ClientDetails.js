const  Tour =require('../models/TourRequestModel.js')



const CreateClientInfo = async(req ,res)=>{
    // const {first_name,second_name,phoneNumber,id_number,postal_address,gender}=req.body
 

    const clientInfo =  { 
        first_name:req.body.first_name,
        second_name:req.body.second_name,
        phoneNumber:req.body.phoneNumber,
        id_number:req.body.id_number,
        postal_address:req.body.postal_address,
        gender:req.body.gender,
        client_id:req.body.client_id
    }
console.log(req.body.client_id, );
    try{
    const client = await moreAboutClient.create(clientInfo)
        // 200 ok
    res.status(200).json(client)

    }catch(error){
        //400 bad request 
        res.status(400).json({mssg:error.message})   
    }
    
}

const gettingClientInfo = async(req, res)=>{
    // const {id} =req.params
    const tour_id = req.query.tour_id
    try {
        const client =await Tour.findOne({
            where:{
                tour_id:tour_id
            }
        })

    res.status(200).json(client)


    } catch (error) {
        return res.status(400)
        
    }
    
}

module.exports = {
    CreateClientInfo,
    gettingClientInfo
}