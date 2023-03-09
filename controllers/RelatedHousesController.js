const  Details =require('../models/UploadModals.js')
const { Op } = require("sequelize");


const relatedHouses = async(req, res)=>{
  const q  = req.query.category;
console.log(q);
  try {
  
    const details =await Details.findAll({
      
      where: {

            category: {
              [Op.eq]: q
            }
    
      },
    })
     if (details.length > 0) {
     
      console.log(details ,'UYI');
      res.status(200).json(details)
    } else {
      res.status(404).json({ message: 'No details found for the specified category' });
    }

  } catch (error) {
    res.status(500)
    
  }
}


module.exports ={relatedHouses}
