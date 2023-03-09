const sequelize = require('sequelize')


const db = new sequelize('sql10603734', 'sql10603734', 'NNVeHhisdc',{
    host:"sql10.freemysqlhosting.net",
    dialect: "mysql"
});
 
module.exports= db; 