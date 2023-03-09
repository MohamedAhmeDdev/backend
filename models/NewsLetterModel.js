
const {DataTypes }=require('sequelize')
const db =require('../config/Database')

    
const NewsLetter = db.define('Newsletter',{

    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
    
 
  
},{
    freezeTablesName:true
})

db.sync()
.then(() => {
    
    console.log('NewsLetter table created successfully!');
 })
 .catch((error) => {
    console.log('Unable to create NewsLetter table' ,error);
 });
 

module.exports = NewsLetter;