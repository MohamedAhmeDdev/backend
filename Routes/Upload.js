const express =require('express')
const {
    createDetails,
    getAllDetails,
    getSingelDetails,
    deleteDetails,
    updateDetails,
    
    ownCompound,
    RentalHouse,
    BnBHouse,
    grtDetailsById,
    getAllHouses,
    getAllTours 
    
    
}=require('../controllers/Details')
const {imageUpload} =require('../middlleware/upload')


const router =express.Router()
//this basically means that the middleware fires first before the other routes so as to protect them
// router.use(requireAuth)
//POST all uploads
//Post a details
router.post('/',imageUpload, createDetails)

 // GET all uploads 
 router.get('/allHouses', getAllHouses)
 router.get('/', getAllDetails)
 router.get('/Bungalow',  ownCompound)
 router.get('/Maisonette',  RentalHouse)
 router.get('/Apartments',  BnBHouse)
 router.get('/TourRequest',  getAllTours )
// 
 
 //Get a single upload 
router.get('/:id', getSingelDetails)

 //DELETE an upload
 router.delete('/:id',deleteDetails)
 // get images by id
 router.get('/:id',grtDetailsById)
 //UPDATE a workout
 router.patch('/:id',imageUpload,updateDetails)    

module.exports = router