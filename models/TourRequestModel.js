
const {DataTypes }=require('sequelize')
const db =require('../config/Database')
const users = require("./UserModels");


    
const Tours = db.define('tours',{

    selectedDate:{
        type:DataTypes.STRING,
    },
   
    time:{
        type:DataTypes.STRING,

    }
  
},{
    freezeTablesName:true
})
Tours.belongsTo(users, { foreignKey: "tour_id" , as:'tour' });
db.sync()
.then(() => {
    console.log('Tours table created successfully!');
 })
 .catch((error) => {
    console.log('Unable to create Tours table' ,error);
 });
 

module.exports = Tours;