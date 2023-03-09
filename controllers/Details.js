const  Details =require('../models/UploadModals')
const  Tours =require('../models/TourRequestModel')
const multer = require('multer')
const path = require('path')
const nodemailer =require('nodemailer')
const users = require("../models/UserModels");
const util = require("util");






const getAllHouses = async(req, res)=>{
   const page_size=100
  try {
    const details =await Details.findAll({

        offset: 0,
        limit: page_size,
        //  skip:page_size*page,
        order: req.query.sort ? sqs.sort(req.query.sort) : [['id', 'desc']]
    })
    
     res.status(200).json(details)

  } catch (error) {
    res.status(500)
    
  }
}

// GET all uploads 
const getAllDetails = async(req, res)=>{
   

try {
    const user_id = req.query.user_id
    console.log(req.query.user_id,'Params')
const details =await Details.findAll({
        where:{
            user_id:user_id
        }
    })
    res.status(200).json(details)
}
 catch (error) {
    res.status(400).json('nop')
 }
}



    const ownCompound = async (req, res) => {
        try {
           let Bangalo= await Details.findAll({ 
            where: { category: "Bungalow" } })
           res.status(200).json(Bangalo)
        } catch (error) {
           res.status(400).json({error:error.message})
        }
       
       }
       const RentalHouse = async (req, res) => {
          try {
           let Maisonette = await Details.findAll({ 
            where: { category: 'Maisonette' } })
           res.status(200).json(Maisonette)
          } catch (error) {
           res.status(400).json({error:error.message})
          }
       
       }
       const BnBHouse = async (req, res) => {
           try {
               let Apartments = await Details.findAll({
                 where: { category: 'Apartments' } })
               res.status(200).json(Apartments)
           } catch (error) {
               res.status(400).json({error:error.message}) 
           }
       }




//Get a single upload 
const getSingelDetails = async(req, res )=>{
    const id =req.params.id// all routes parameter are stored in the params property
    const details = await Details.findOne({
        where: {id: id }  
    })
    
    if(!details){
        return res.status(404).json({error:'Details does not exist'})// the  reason why am returning is because it will carry on and fire the code 
    }
    res.status(200).json(details)//if it doesn't fire the if statment that means if fond the details so i get a response

}
//CREATE an upload
const createDetails = async(req ,res)=>{
    const id =req.params
    const  images =[]
    

    const info ={ 
        
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        contact: req.body.contact,
        category: req.body.category,
        price: req.body.price,
        user_id :req.body.user_id
    }
    if( req.files){
         info.image = req.files.path

    } 
    // if (req.files.length > 0) {
    //     // Access the uploaded files using req.files array
    //     for (let i = 0; i < req.files.length; i++) {
    //       console.log('File ' + (i+1) + ':');
    //       console.log('  Filename:', req.files[i].filename);
    //       console.log('  Path:', req.files[i].path);
    //       console.log('  Size:', req.files[i].size);
    //     }
    //   }
    
    console.log(req.files);
  
    try{
    

       const response = await Details.create(info)
       console.log(response);

       const user = await users.findOne({where:{id:id } });
        // 200 ok

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
              user:'lamechcruze@gmail.com',
              pass:"fdbmegjxghvigklv"
      
            }
          })
          //email option 
         
          const mailOption={
            
            // from:'brian@gmail.com',
            to:`lamechcruze@gmail.com`,
            subject:"Post Alert ",
            html:' Hello Admin\n\n'
            +`<p>You are reciving this email because  a user has posted a house at kausi.</p> :\n\n`

          }
          // end of else
          
          transporter.sendMail(mailOption,(err ,response)=>{
            if(err){
              console.log('There was an error',err);
            }else{
              console.log('There was a response ',response);
              res.status(200).json(' email sent ')
            }
           })
        
    
    
    }catch(error){
        //400 bad request 
        res.status(400).json({mssg:error.message})   
    }
    
}


const RequstingAtour = async(req ,res)=>{
    const id =req.params
    const info ={ 
        selectedDate: req.body.selectedDate,
        time:req.body.time,
        tour_id:req.body.tour_id,
       
    }
    
  try {
    const response = await Tours.create(info )
    // res.status(200).json({mssg:error.message}) 
    
    const user = await users.findOne({

        where:{
            id:id
        }
     });
        // 200 ok

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
              user:'lamechcruze@gmail.com',
              pass:"fdbmegjxghvigklv"
      
            }
          })
          //email option 
         
          const mailOption={
            
            // from:'brian@gmail.com',
            to:`lamechcruze@gmail.com`,
            subject:"Tour Alert ",
            html:' Hello Admin\n\n'
            +`<p>You are reciving this email because user has requested a tour.</p> :\n\n`

          }
          // end of else
          
          transporter.sendMail(mailOption,(err ,response)=>{
            if(err){
              console.log('There was an error',err);
            }else{
              console.log('There was a response ',response);
              res.status(200).json(' email sent ')
            }
           })
          
    
  } catch (error) {
    res.status(400).json({mssg:error.message})   
    
  }
}


const getAllTours = async(req, res)=>{
    const id =req.params
    const tour =await Tours.findAll({})
    // const user =await users.findOne({
    //     where:{
    //         id:id
    //     }
    // })

    res.status(200).json(tour)
  } 
    

//GET DETAILS BY ID
const grtDetailsById = async(req, res)=>{
    const {id} =req.params
    try {
        const details =await Details.findOne({
            where:{
                id:id   
            }
        })

    res.status(200).json(details)


    } catch (error) {
        return res.status(400).json({error:"Details doesn't] exist "})
        
    }
    
}

//DELETE an upload
const deleteDetails = async(req , res)=>{
    const {id} =req.params
    const details = await Details.destroy({
        where:{
            id:id
        }
    })
    if(!details){
        return res.status(400).json({error:"Details doesn't exist "})
    }
    res.status(200).json(details)
}
//UPDATE a upload
const updateDetails = async(req, res)=>{
    const {id} =req.params
    const info =  { 
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        contact: req.body.contact,
        category: req.body.category,

        price: req.body.price

    }

    if( req.file){
        info.image = req.file.path
   }
    const details =await Details.update(info,{
        where:{
            id:id
            
        }
    })
    
if(!details){
    return res.status(400).json({error:"Details doesn't exist "})
    }
    res.status(200).json(details)
    
}



// let imageUpload = multer({ 
//     storage:fileStorageEngine
    
// //   limits: { fileSize: '10000000' },


// }).array('image',5);







module.exports={
    createDetails,
    getSingelDetails,
    getAllDetails,
    deleteDetails,
    updateDetails,
    ownCompound,
    RentalHouse,
    BnBHouse,
    grtDetailsById,
    getAllHouses,
    RequstingAtour,
    getAllTours
}
