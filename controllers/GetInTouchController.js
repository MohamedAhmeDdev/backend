const Contact = require('../models/GetInTouch')


const createGetInTouch =async(req ,res)=>{
    const info={
         email: req.body.email,
        subject: req.body.subject,
        description: req.body.description,

    }
   try {
    const contats =await Contact.create(info)
    res.status(200).json(contats)
    
   } catch (error) {
    res.status(400).json({error:error.message})
    
   }
}


const getNewsLetter =async(req,res)=>{
    try {
         const contactInfo = await Contact.findAll({})
         res.status(200).json(contactInfo)
    } catch (error) {
         res.status(400)
    }
}

const deleteContact = async(req , res)=>{
    const {id} =req.params
    const contacts = await Contact.destroy({
        where:{
            id:id
        }
    })
    if(!contacts){
        return res.status(400)
    }
    res.status(200).json(contacts)
}



module.exports= {createGetInTouch ,getNewsLetter,deleteContact}