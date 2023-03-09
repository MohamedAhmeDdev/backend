const  Details =require('../models/UploadModals.js')
const NewsLetter = require('../models/NewsLetterModel')


const getDetails = async(req, res)=>{

  let count =0

  try {

    const details =await Details.findAll({})
      
    count = details.length
    
    res.status(200).json(count)

  } catch (error) {
    res.status(500)
    
  }
   
}

const getNewsLetter = async(req, res)=>{

  let count =0

  try {

    const details =await NewsLetter.findAll({})
      
    count = details.length
    
    res.status(200).json(count)

  } catch (error) {
    res.status(500)
    
  }
   
}

module.exports={
  getDetails,
  getNewsLetter
}