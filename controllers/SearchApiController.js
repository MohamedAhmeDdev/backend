
const  Details =require('../models/UploadModals.js')

const { Op } = require("sequelize");



const getSearch = async(req, res)=>{
  // try {
    
  //   // Observe that no operator (from Op) was explicitly passed, so Sequelize assumed an equality comparison by default. The above code is equivalent to:
  //   // const Op = Sequelize.Op;
  //   const key = req.params.key
  //   console.log(key,'Params');
  //   const details =await Details.findAll({
        
  //       where: {
  //           category: {
  //               [Op.regexp]: key

  //           }
  //         }
  //   })
     

     try {
      const { q } = req.query;
      

      const keys =["title" ,"price" ,"category"]

      const search =(data)=>{
        return data.filter((item)=>
          keys.some((key)=>item[key].toLowerCase().includes(q))
        )

      }

      const products = await Details.findAll({});
    
      res.status(200).json(search(products))
    

  } catch (error) {
    res.status(500).json(error)
    console.log(error);
    
  }
}



  
module.exports = {
  
    getSearch
  };
  