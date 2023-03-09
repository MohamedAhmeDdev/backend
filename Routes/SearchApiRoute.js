const express =require('express')


const {
    getSearch
    
    
}=require('../controllers/SearchApicontroller')

const router =express.Router()

router.get('/',getSearch)

module.exports = router
