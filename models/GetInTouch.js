
const {DataTypes }=require('sequelize')
const db =require('../config/Database')

    
const Contact = db.define('contact_us',{

    email:{
        type:DataTypes.STRING,
        unique:true
    },
   
    subject:{
        type:DataTypes.STRING,

    },
    description:{
        type:DataTypes.STRING,

    }
  
},{
    freezeTablesName:true
})

db.sync()
.then(() => {
    console.log('Contact table created successfully!');
 })
 .catch((error) => {
    console.log('Unable to create Contact table' ,error);
 });
 

module.exports = Contact;