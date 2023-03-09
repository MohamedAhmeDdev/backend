
const users = require("../models/UserModels.js");




const emailToAdmin = async(req,res)=>{
    const { email} = req.body;

    try {
     
      const user = await users.findOne({ where: { email: email } });
      if(!user){
        res.status(404).json({msg:'email does not  exists'})
        
      }else{
  
      //create a nodeMailer Transport
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
        to:`${user.email}`,
        subject:"Post Alert ",
        html:' Hello Admin\n\n'
        +'You are reciving this email because  someone  has posted a house at kausi.:\n\n'
    
  
      }
      // end of else
      
      transporter.sendMail(mailOption,(err ,response)=>{
        if(err){
          console.log('There was an error',err);
        }else{
          console.log('There was a response ',response);
          res.status(200).json('recovery email sent ')
        }
       })
      }
    } catch (error) {
      
    }
  
  }
    
  
module.exports={
  emailToAdmin
}