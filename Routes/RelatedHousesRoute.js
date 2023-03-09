const express =require('express')
const router =express.Router()

const {
    relatedHouses
    
}=require('../controllers/RelatedHousesController')

router.get('/',relatedHouses)


module.exports = router