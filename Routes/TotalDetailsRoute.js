const express =require('express')


const {
    getDetails,
    getNewsLetter
    
}=require('../controllers/TotalDetailsController')

const router =express.Router()

router.get('/',getDetails)
router.get('/newsLetters',getNewsLetter)

module.exports = router
