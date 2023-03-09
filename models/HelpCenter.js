const {DataTypes }=require('sequelize')
const db =require('../config/Database')

    
const HelpCenter = db.define('HelpCenter',{

    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.STRING,
     
    }
 
  
},{
    freezeTablesName:true
})

db.sync()
.then(() => {
    
    console.log('HelpCenter table created successfully!');
 })
 .catch((error) => {
    console.log('Unable to create HelpCenter table' ,error);
 });
 

module.exports = HelpCenter;