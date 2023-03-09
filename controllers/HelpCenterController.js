const HelpCenter = require('../models/HelpCenter')
// const users = require('../models/UsersModel')
const nodemailer =require('nodemailer')




const createInformation = async(req ,res)=>{
    const id =req.params

    const info ={ 
        
        email: req.body.email,
        description: req.body.description,
        
    }
  
    try{
    

       const response = await HelpCenter.create(info)

    //    const user = await users.findOne({where:{id:id } });
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
            subject:" Help Alert ",
            html:' Hello Admin\n\n'
            +`<p>You are reciving this email because  someone is in need of help .</p> :\n\n`

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


const getInfo =async(req,res)=>{

  const helpcanter =await HelpCenter.findAll({})


  res.status(200).json(helpcanter)
} 
module.exports= {
  createInformation,
  getInfo
}
