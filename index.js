

const express =require ("express");
const db =require( "./config/Database.js");
const cors =require('cors')
require('dotenv').config()
const userRoute =require('./Routes/user')
const uploadRoute =require('./Routes/Upload')
const contact =require('./Routes/GetInTouch')
const moreAboutClient =require('./Routes/ClientMore')
const NewsLetters=require('./Routes/NewsLetterRoute')
const TotalHouses=require('./Routes/TotalDetailsRoute')
const relatedHouses=require('./Routes/RelatedHousesRoute')
const Houses=require('./Routes/PaginationRoute')
const Mail=require('./Routes/SendEmailRoute')
const search=require('./Routes/SearchApiRoute')
const tours=require('./Routes/TourRequestRoute')
const helpCenter=require('./Routes/HelpCenterRoute')
const bodyParser = require('body-parser');
const app =express()

app.use(cors())

 // middleware to look if the req has some body to it if true passed on to req to the object

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
// routes for postman testing
//static
app.use('/Images', express.static('./Images'))

//connection to database

try{
    db.authenticate()
    console.log('database connected');
  app.listen(process.env.PORT, () => 
  console.log('Server running on port',process.env.PORT))
 
}catch(err){
    console.log('Connection error')
}
    // routes

    
app.use((req ,res ,next)=>{

  console.log(req.path ,req.body,req.method)
  next()
})

app.use('/Details',uploadRoute);
app.use('/Users',userRoute);
app.use('/contacts',contact)
app.use('/client',moreAboutClient)
app.use('/news',NewsLetters)
app.use('/Total',TotalHouses)
app.use('/RelatedHouses',relatedHouses)
app.use('/paginatedHouses',Houses)
app.use('/AdminMail',Mail)
app.use('/search',search)
app.use('/ClientTour',tours)
app.use('/help',helpCenter)




  












