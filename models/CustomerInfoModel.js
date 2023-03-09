
const {DataTypes }=require('sequelize')
const db =require('../config/Database')
const users = require("./UserModels");


    
const moreAboutClient = db.define('client_info',{

    first_name:{
        type:DataTypes.STRING,
    },
    second_name:{
        type:DataTypes.STRING,
    },
    phoneNumber:{
        type:DataTypes.STRING,

    },
    id_number:{
        type:DataTypes.STRING,

    },
    postal_address:{
        type:DataTypes.STRING,

    },
    client_id:{
        type:DataTypes.INTEGER,

    },
    gender:{
        type:DataTypes.STRING,

    }
  
  
},{
    freezeTablesName:true
})
moreAboutClient.belongsTo(users, { foreignKey: "client_id", as:'client' });

db.sync()
.then(() => {
    console.log('client_info table created successfully!');
 })
 .catch((error) => {
    console.log('Unable to create client_info table' ,error);
 });
 

module.exports = moreAboutClient;