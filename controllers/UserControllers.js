// const { json } = require('sequelize/types/sequelize.js')
const users = require("../models/UserModels");
const  Details =require('../models/UploadModals')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto= require('crypto')
const nodemailer =require('nodemailer')
const createToken = ([id,email,role,isAdmin,Active ]) => {
  return jwt.sign({ 
    id:id,
    email:email,
    role:role,
    isAdmin:isAdmin,
    Active:Active,

  
  }, process.env.SECRET, { expiresIn: "1000" });
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(404)
    }
    const user = await users.findOne({ where: { email: email } });

    if (!user) {
      // the reason why throw is being used is because we dont have acces to the json
      res.status(400).json({ error: "invalid  email" });
    }
    // trying to compare the password N/B :user.password is the hased password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ error: "invalid  password" });
    }
    const token = createToken([user.id,user.email,user.role,user.isAdmin,user.Active])
    res.status(201).json({ 
      id: user.id,
      email: user.email,
      role: user.role,
      isAdmin:user.isAdmin,
      Active:user.Active,

      token });
 
  } catch (error) {
  //  json({ error: error.message });
  }
};




const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt );
  const checkEmail = await users.findOne({where: {email: email}})
  
 let emailFormart = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 

  try {
    if(emailFormart.test(email)){
      res.status(401)
     }

   if(checkEmail){
      res.status(400)
    }
    
   
    const User = await users.create({

      email,
      password: hash,
      role:'user'
    });

    //create a token,
    const token = createToken([User.id,User.email,User.role,User.isAdmin,User.Active] );
    // res.status(200).json(User)

    // pass the token as a response instead of the user
    res.status(200).json({ 
      id: User.id,
      email: User.email,
      role: User.role,
      isAdmin:User.isAdmin,
      Active:User.Active,
      token
     });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllUsers = async(req, res)=>{
  const user =await users.findAll({})
  res.status(200).json(user)
} 
//activating and deactivating auser
const deactivate=async (req, res) => {
  const {id}=req.params
  console.log(id ,'');
  const userStatus={
    Active: req.body.Active,

  }
  const userEmail =await users.update(userStatus,{ where:{id:id}
  })
  if(!userEmail){
    return res.status(400).json({msg:"nop"})  }
    res.status(200).json(userEmail)
};



//deleting a user 
const deleteUser = async(req , res)=>{
  // const user_id = req.query.user_id

  const {id} =req.params
  console.log(id,'ID');
   await Details.destroy({
    where:{
        id:id
    }
})
  const user = await users.destroy({
      where:{
          id:id,
      }
      
  })

  if(!user){
      return res.status(400).json({error:"user doesn't exist "})
  }
  res.status(200).json(user)
}
// get  single user
const getUserById = async(req , res)=>{
  const {id}=req.params
  const User = await users.findOne({
      where:{
          id:id
      }
  })
  if(!User){
      return res.status(400)

}else{
res.status(200).json(User)
}
}
//elevating user
const getUserInfo = async(req , res)=>{
  const {id}=req.params
  const User = await users.findOne({
      where:{
          id:id
      }
  })
  if(!User){
      return res.status(400)

}else{
res.status(200).json(User)
}
}

// reset password 


const forgotPassword = async(req,res)=>{
  const { email} = req.body;
  

  try {
    if (!email ) {
      res.status(400).json({mssg:'email required'})
    }
      
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
      subject:"Reset password link",
      html:'You are reciving this email because you or someone else has requested the reset of password for your account.\n\n'
      +'please click on the following link bellow or paste this link into your browser to complete this proces within an hour of reciving it :\n\n'
      // +'<a href="http://localhost:3000/reset/\n\n'+ user.id +' ">Click here to reset </a> '

      +'<a href="http://localhost:3000/Reset/' + user.id + '>Click here to reset</a> '
      +'if you did not request this please ignore this email and your password will remain the same '
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
  

//rest 
const reset =async(req, res )=>{
  const { password ,confirmPassword} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt );
  const {id}=req.params
  if(password === confirmPassword){
    // res.status(200).json({mssg:'okay'})
  
  }else{
   res.status(400).json({mssg:'Password Dont match'})

  }
  try {
    
    const updatedPassword = await users.update({ password:hashedPassword }, { where: { id: id}})
    res.status(200).json( updatedPassword)

  } catch (error) {
    // return res.status(400).json({mssg:'no',error})

 
  }


}
const updateUserEmail = async(req ,res)=>{
  const {id} =req.params
const info =  { 

    role: req.body.role,
    email: req.body.email,
}
  const userEmail =await users.update(info,{ where:{id:id}
})
if(!userEmail){
  return res.status(400).json({msg:"nop"})  }
  res.status(200).json(userEmail)
  
}




 
  
module.exports = {
  loginUser,
  signupUser,
  getAllUsers,
  reset,
  forgotPassword,
  deleteUser,
  updateUserEmail,
  getUserById,
  getUserInfo,
  deactivate

};
